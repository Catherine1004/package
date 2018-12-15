

var form=document.forms[0];
var txtTel=form.Account;
var txtPwd=form.Password;
function vali(txt,reg){
	var span=txt.nextElementSibling;
	if(reg.test(txt.value)){
	span.style.display="none";
	return true;
	}else{
	span.style.display="block";
	return false;
	}
}
txtTel.onblur=function(){
	vali(this,/^\s*1[3-8]\d{9}$/);
};
txtPwd.onblur=function(){
	vali(this,/^\w{6}$/)
};

$(function(){
  $("#btnSubmit").click(function(e){
    e.preventDefault();
    var phone=$("#Account").val();
    var upwd=$("#Password").val();
    console.log(111);
    (async function(){
      var res=await $.ajax({
        url:"http://localhost:9000/users/signin",
        type:"post",
        data:{phone,upwd},
        dataType:"json"
      })
      console.log(res);
      if(res.code==0){
        alert(res.msg);
      }else{
        alert("登录成功！即将返回原来的页面")
        if(location.search.startsWith("?back=")){
          var url=location.search.slice(6);
        }else{
          var url="index.html"
        }
        location.href=url;
      }
    })()

    //自动登录
    Save();
  })

  //自动登录
  $(document).ready(function(){
    if($.cookie("rmbUser")=="true"){
      $("#Remember").attr("checked",true);
      $("#Account").val($.cookie("phone"));
      $("#Password").val($.cookie("password"));
    }
  })

  //记住用户密码
  function Save(){
    if($("#Remember").attr("checked")){
      var str_phone=$("#Account").val();
      var str_password=$("#Password").val();
      $.cookie("rmbUser","true",{expires:7});  //存储一个带7天期限的cookie
      $.cookie("phone",str_phone,{expires:7});
      $.cookie("password",str_password,{expires:7});
    }else{
      $.cookie("rmbUser","false",{expires:-1});  
      $.cookie("phone","",{expires:-1});
      $.cookie("password","",{expires:-1});
    }
  }
})