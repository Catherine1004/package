const express=require("express");
const router=express.Router();
const pool=require("../pool");


//产品列表
router.get("/list",(req,res)=>{
	var output={pageSize:12};
	output.pno=req.query.pno;
	var sql="SELECT *,( SELECT md from ps_product_pic where ps_product_pic.lid=ps_product.lid limit 1 ) as md FROM ps_product where is_onsale=1";
	pool.query(sql,[],(err,result)=>{
		if(err) throw err;
		output.count=result.length;
		output.pageCount=Math.ceil(output.count/output.pageSize);
		output.products=result.splice(output.pno*12,output.pno*12+12);
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"
		})
		res.write(JSON.stringify(output));
		res.end()
	})
})

//分页
router.get("/",(req,res)=>{
	var kwords=req.query.kwords;
	var arr=kwords.split(" ");
	//console.log(arr);
	for(var i=0;i<arr.length;i++){
		arr[i]=`title like '%${arr[i]}%'`;
	}
	var where=" where "+arr.join(" and ")+" and is_onsale=1 ";
	var output={ pageSize:12};
	output.pno=req.query.pno;
	var sql="SELECT *,( SELECT md from ps_product_pic where ps_product_pic.lid=ps_product.lid limit 1 ) as md FROM ps_product";
	pool.query(sql+where,[],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		output.count=result.length;
		output.pageCount=Math.ceil(output.count/output.pageSize);
		//console.log(output);
		output.products=result.splice(output.pno*12,output.pno*12+12);
		//console.log(output.products);

		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"
		})
		res.write(JSON.stringify(output));
		res.end()
	})
	//console.log(res);
})
module.exports=router;