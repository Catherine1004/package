const express=require("express");
const router=express.Router();
const pool=require("../pool")

//首页轮播
router.get("/carousel",(req,res)=>{
  var sql="SELECT * FROM ps_index_carousel";
  pool.query(sql,[],(err,result)=>{
    if(err) throw err;
    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    res.write(JSON.stringify(result));
    res.end();
  })
})

//首页1F
router.get("/",(req,res)=>{
  var sql="SELECT * FROM ps_index_product WHERE seq_top_sale=1 ORDER BY seq_recommended";
  pool.query(sql,[],(err,result)=>{
    if(err) console.log(err);
    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    res.write(JSON.stringify(result));
    res.end();
  })
})
module.exports=router;

