$(function(){
	$("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
	// 引入头部
	$.ajax({
		url:"http://localhost:9000/header.html",
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
				var kwords=decodeURI(location.search.split("=")[1])
				$input.val(kwords);
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
	});

	//动态获取轮播图片
  $.ajax({
    url:"http://localhost:9000/index/carousel",
    type:"get",
    dataType:"json",
    success:function(res){
      //console.log(res);
      var html="";
      for(var c of res){
        html+=`<li><a href="${c.href}"><img src="${c.img}" ></a></li>`
      }
      var ul=document.getElementById("lunbo");
      //console.log(ul);
			$(ul).html(html);
			$(ul).children().first().addClass("show");
    }
	})
	
	// 图片轮播
	function task(){
		var $show=$(".show");
		$show.removeClass("show");
		if($show.next().length==0){
			var next=$show.parent().children("li:first-child");
			var i=0;
		}else{
			var next=$show.next();
			i=$show.index()+1;
		}
		next.addClass("show");
		$("ul.circles").children(`:eq(${i})`).addClass("active").siblings().removeClass("active");
	}
	var timer=setInterval(task,2000);

	var mainBox=$("#header");
	// console.log(mainBox)
	mainBox.on("mouseover",".lunbo",function(){
		clearInterval(timer);
		timer=null;
	})
	mainBox.on("mouseout",".lunbo",function(){
			timer=setInterval(task,2000)
	})
	mainBox.on("click",".right",function(){
		task();	
	})
	mainBox.on("click",".left",function(){
		var $show=$(".show");
		$show.removeClass("show");
		if($show.prev().length==0){
			var prev=$show.parent().children("li:last-child");
			var index=$("#lunbo>li").length-1;
		}else{
			var prev=$show.prev();
			var index=$show.index()-1;
		}
		prev.addClass("show");
		$("ul.circles").children(`:eq(${index})`).addClass("active").siblings().removeClass("active");
	})

	
	mainBox.on("click",".circle",function(){
		var $ul=$(".circles");
		//console.log($ul);
		var $div=$("#lunbo");
		//console.log($div)
		var i=$(this).index();
		//console.log(i)
		$div.children(`:eq(${i})`).addClass("show").siblings().removeClass("show");
		$ul.children(`:eq(${i})`).addClass("active").siblings().removeClass("active");
	})



})



	
