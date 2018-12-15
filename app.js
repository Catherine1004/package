//引入模块express、body-parser
const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');

/*引入路由模块*/
const index=require("./routes/index");
const details=require("./routes/details");
const products=require("./routes/products");
const users=require("./routes/users");


//构建web服务器、监听窗口
var app = express();
var server = app.listen(9000);
//托管静态资源
app.use(express.static('./public'));
//使用中间件
app.use(bodyParser.urlencoded({
	extended:false
}));

app.use(session({
	secret:'128位随机字符串',
	resave:false,
	saveUninitialized:true,
}))
//将路由器挂载
app.use("/index",index);
app.use("/details",details);
app.use("/products",products);
app.use("/users",users);

