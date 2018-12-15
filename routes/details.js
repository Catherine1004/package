const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
  var lid=req.query.lid;
  //console.log(lid);
  var output={product:{},pics:[],specs:[]};
  var sql1="SELECT ps_product.*,ps_product_details.sname FROM ps_product,ps_product_details where lid=? AND ps_product.sid=ps_product_details.sid AND ps_product.is_onsale=1";
  var sql2="SELECT * FROM ps_product_pic WHERE lid=?";
  var sql3="SELECT lid,spec FROM ps_product where pname=( select pname from ps_product where lid=? ) and is_onsale=1 "
  Promise.all([
    new Promise(function(open){
      pool.query(sql1,[lid],(err,result)=>{
        if(err) throw err;
        output.product=result[0];
        open();
      })
    }),
    new Promise(function(open){
      pool.query(sql2,[lid],(err,result)=>{
        if(err) throw err;
        output.pics=result;
        //console.log(result);
        open();
      })
    }),
    new Promise(function(open){
      pool.query(sql3,[lid],(err,result)=>{
        if(err) throw err;
        output.specs=result;
        open();
      })
    })
  ]).then(function(){
    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    res.write(JSON.stringify(output));
    res.end();
    //console.log("响应完成！");
  })
})
module.exports=router;
