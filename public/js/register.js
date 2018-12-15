$(function(){
	var $uname=$("#Uname"),
			$phone=$("#Account"),
			$upwd=$("#Password"),
			$cpwd=$("#conPassword");

	

	
	
	//正则表达式验证
	function vali(txt,reg){
		var error=$(txt).next(".error01");
		if(reg.test($(txt).val())){
			error.css("display","none");
			return true;
		}else{
			error.css("display","block");
			return false;
		}
	}

	$phone.blur(function(){
		var v=vali(this,/^\s*1[3-8]\d{9}$/);
		console.log(v);
		if(v){
			var phone=$("#Account").val();
			$.ajax({
				url:"http://localhost:9000/users/isregister",
				type:"post",
				async:false,
				data:{phone},
				dataType:"json",
				success:function(res){
					if(res.code==1){//重复
						$phone.next(".error01").html("该用户已被注册！");
						$phone.next(".error01").css("display","block");
					}else{
						$phone.next(".error01").css("display","none");
					}
				}
			})
		}else{
			$phone.next(".error01").css("display","block");
		}
	})

	$upwd.blur(function(){
		vali(this,/^\w{6}$/);
	})

	$cpwd.blur(function(){
		vali(this,/^\w{6}$/);
		if($(this).val()!=$upwd.val()){
			$(this).next(".errir01").css("display","block");
		}else{
			$(this).next(".errir01").css("display","none");
		}
	})

	$("#btnRegister").click(function(e){
		e.preventDefault();
		var isRegister=false;
		if((!/^\s*1[3-8]\d{9}$/.test($phone.val()))||$phone.val()==''){
			$phone.next(".error01").css("display","block");
			return;
		}else{
			var phone=$("#Account").val();
			//判断是否注册
			console.log(1);
			console.log(isRegister);
			$.ajax({
				url:"http://localhost:9000/users/isregister",
				type:"post",
				async:false,
				data:{phone},
				dataType:"json",
				success:function(res){
					if(res.code==1){//重复
						$phone.next(".error01").html("该用户已被注册！");
						$phone.next(".error01").css("display","block");
						isRegister=true;
						console.log(isRegister);
					}else{
						$phone.next(".error01").css("display","none");
						isRegister=false;
						console.log(isRegister);
					}
				}
			})
			console.log(2);
			console.log(isRegister);
			if(!isRegister){
				if((!/^\w{6}$/.test($upwd.val()))||$upwd.val()==''){
			
					$upwd.next(".error01").css("display","block");
				}else if($cpwd.val()!=$upwd.val()||$upwd.val()==''){
					$upwd.next(".error01").css("display","none");
					$cpwd.next(".error01").css("display","block");
				}else if(($("#hasRead").attr("checked"))){
					console.log(11)
					$("#hasRead").next(".error01").css("display","none");
		
					//如果未注册
					var uname=$("#Uname").val();
					var phone=$("#Account").val();
					var upwd=$("#Password").val();
					var cpwd=$("#conPassword").val();
					if(!isRegister){
						console.log(isRegister);
						$.ajax({
							url:"http://localhost:9000/users/register",
							type:"get",
							async:false,
							data:{uname,phone,upwd,cpwd},
							dataType:"json",
							success:function(res){
								if(res.code==1){
									alert(res.msg);
									if(location.search.startsWith("?back=")){
										var url=location.search.slice(6);
									}else{
										var url="index.html"
									}
									location.href=url;
								}else{
									alert(res.msg);
								}
							}
						})
					}
		
					console.log(333);
					console.log(isRegister);
					$cpwd.next(".error01").css("display","none");
				}else{
					$("#hasRead").next(".error01").css("display","block");
				}
			}
		}
			
	})


})