//引入express模块
const express=require("express");
//创建路由器
const router=express.Router();
//引入mysql连接池
const pool=require("../pool")

//在路由器下建路由
//1.登录
//登录
router.post("/signin",(req,res)=>{
  var phone=req.body.phone;
  var upwd=req.body.upwd;
  //console.log(phone,upwd)
  var sql="SELECT * FROM ps_user WHERE phone=? AND upwd=?"
  pool.query(sql,[phone,upwd],(err,result)=>{
    if(err) throw err;
    //console.log(result);
    if(result.length>0){
      res.writeHead(200);
      var user=result[0];
      req.session.uid=user.uid;
      res.write(JSON.stringify({code:1,msg:"登录成功！"}))
    }else{
      res.write(JSON.stringify({code:0,msg:"手机号码或密码错误！"}))
    }
    res.end();
  })
})

//是否登录
router.get("/islogin",(req,res)=>{
  res.writeHead(200,{
	  "Content-Type":"application/json;charset=utf-8",
	  "Access-Control-Allow-Origin":"*"
	})
  if(req.session.uid===undefined){
    res.write(JSON.stringify({code:0,msg:"请先登录！"}))
    res.end()
  }else{
    var uid=req.session.uid;
    var sql=
     "select * from ps_user where uid=?"
    pool.query(sql,[uid],(err,result)=>{
      if(err) throw err;
      var user=result[0];
      res.write(JSON.stringify({
        code:1,uname:user.uname
      }))
      res.end()
    })
  }
  
})
//注销
router.get("/signout",(req,res)=>{
  req.session["uid"]=undefined;
  //console.log(res);
  res.end();
})

//2.注册
//是否注册
router.post("/isregister",(req,res)=>{
	res.writeHead(200,{
	  "Content-Type":"application/json;charset=utf-8",
	  "Access-Control-Allow-Origin":"*"
	})
	var phone=req.body.phone;
  var uname=req.body.uname;
 // console.log(phone,uname)
	var sql="SELECT * FROM ps_user WHERE phone=?";
	pool.query(sql,[phone],(err,result)=>{
    if(err) throw err;
    //console.log(result)
		if(result.length!==0){
			res.write(JSON.stringify({code:1,msg:"该用户电话已被注册,请直接登录！"}));
			res.end();
		}else{
      res.write(JSON.stringify({code:0,msg:"未被注册，请继续注册！"}))
      res.end();
		}
	})
})

//注册
router.get("/register",(req,res)=>{
  var phone=req.query.phone;
	var uname=req.query.uname;
  var upwd=req.query.upwd;
	var cpwd=req.query.cpwd;
  //console.log(phone,upwd)
  var sql="INSERT INTO ps_user VALUES(NULL,?,?,'',?,'','','')";

	pool.query(sql,[uname,upwd,phone],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		if(result.affectedRows>0){
			res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"
			})
			res.write(JSON.stringify({code:1,msg:"注册成功！"}))
		}else{
			res.write(JSON.stringify({code:0,msg:"注册未成功，请填写完整信息！"}))
		}
		res.end();
	})
})

//路由器导出
module.exports=router;


