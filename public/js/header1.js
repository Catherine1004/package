$(function(){
	$("<link rel='stylesheet' href='css/header1.css'>").appendTo("head")
	$.ajax({
		url:"http://localhost:9000/header1.html",
		type:"get",
		success:function(res){
			$("#header").html(res);
			// 输入框模糊查询
		  var $btnSearch=$("#header div.search-right span span.search-circle img"),
			  $input=$("#header div.search-right span input");
		  $btnSearch.click(function(){
			var kw=$input.val().trim();
			if(kw!==""){
			  location.href=`product.html?kwords=${kw}`;
			}
		  })
		  $input.keyup(function(e){
			if(e.keyCode==13){
			  $btnSearch.click();
			}
		  })

		  if(location.search.indexOf("kwords")!=-1){
			var kwords=decodeURI(
			  location.search.split("=")[1]
			)
			$input.val(kwords)
		  }
		  // 登录
		  $("#btnLogin").click(function(){
			location.href="user_login.html?back="+location.href;
		  })
		  //注册
		  $("#btnRegister").click(function(){
			location.href="user_register.html?back="+location.href;
		  })
		  // 注销
		  $.ajax({
			url:"http://localhost:9000/users/islogin",
			type:"get",
			dataType:"json",
			success:function(res){
			  if(res.code==0){
				$("#signout").show().next().hide();
			  }else{
				$("#uname").html(res.uname);
				$("#signout").hide().next().show();
			  }
			}
		  })

		  $("#btnSignout").click(function(){
			$.ajax({
			  url:"http://localhost:9000/users/signout",
			  type:"get",
			  success:function(){ location.reload(); }
			})
		  })
		}
	})
})