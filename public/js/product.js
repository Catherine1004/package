$(function(){
  //console.log(111);
	//显示产品页
	

  if(location.search.indexOf("kwords=")!=-1){
    var kwords =decodeURI(
      location.search.split("=")[1]
    );
    var pno=0;
    //console.log(kwords);
    function loadPage(no=0){
      //console.log(111);
      //console.log(pno)
      pno=no;
      $.ajax({
        url:"http://localhost:9000/products",
        type:"get",
        data:{kwords,pno},
        dataType:"json",
        success:function(output){
          //console.log(output)
          var {products,pageCount}=output;
          var html="";
          for(var p of products){
            var {lid,title,price,md}=p;
            html+=`<li class="goods">
              <div class="d-goods">
                <a href="product_details.html?lid=${lid}" ><img src="${md}" alt="${title}" class="goods-img"></a>
                <div class="goods-name">
                  <p><a href="product_details.html?lid=${lid}" title="${title}" >${title}</a></p>
                  <div>
                    <span>￥${price.toFixed(2)}</span>
                    <span class="delete">
                      <span>￥</span>
                      <span>${price.toFixed(2)}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="sh_car">
                <button type="button" class="btn-sh"><img src="img/index/shop_car.png" alt="" style="vertical-align:bottom">加入购物车</button>
                <a href="#" class="buy">立即购买</a>
                <button type="button" class="btn-xin"></button>
              </div>
            </li>`
          }
          console.log(html);
          $(".goods-list").html(html);

          var html="";
          for(var i=1;i<=pageCount;i++){
            html+=`<span class="${i==pno+1?'active':''}"><a href="#">${i}</a></span>`
          }
          $(".limit").children(":not(:first-child):not(:last-child)").remove();
          $(".limit").children().first().after(html);
          if(pno==0){
            $(".limit").children().first().addClass("disabled");
          }else{
            $(".limit").children().first().removeClass("disabled")
          }
          if(pno==pageCount-1){
            $(".limit").children().last().addClass("disabled")
          }else{
            $(".limit").children().last().removeClass("disabled")
          }
        }
      })
    }
    loadPage();
    $(".limit").on("click","a",function(e){
      e.preventDefault();
      var $a=$(this);
      if(!$a.parent().is(".disabled,.active")){
        if($a.parent().is(":first-child")){
          var no=pno-1;
        }else if($a.parent().is(":last-child")){
          var no=pno+1;
        }else{
          var no=$a.html()-1;
        }
        loadPage(no);
      }
    })
  }else{
		var pno=0;
		function getProduct(no=0){
      //console.log(111);
      //console.log(pno)
      pno=no;
      $.ajax({
        url:"http://localhost:9000/products/list",
        type:"get",
        data:{pno},
        dataType:"json",
        success:function(output){
          //console.log(output)
          var {products,pageCount}=output;
          var html="";
          for(var p of products){
            var {lid,title,price,md}=p;
            html+=`<li class="goods">
              <div class="d-goods">
                <a href="product_details.html?lid=${lid}" ><img src="${md}" alt="${title}" class="goods-img"></a>
                <div class="goods-name">
                  <p><a href="product_details.html?lid=${lid}" title="${title}" >${title}</a></p>
                  <div>
                    <span>￥${price.toFixed(2)}</span>
                    <span class="delete">
                      <span>￥</span>
                      <span>${price.toFixed(2)}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="sh_car">
                <button type="button" class="btn-sh"><img src="img/index/shop_car.png" alt="" style="vertical-align:bottom">加入购物车</button>
                <a href="#" class="buy">立即购买</a>
                <button type="button" class="btn-xin"></button>
              </div>
            </li>`
          }
          //console.log(html);
          $(".goods-list").html(html);

          var html="";
          for(var i=1;i<=pageCount;i++){
            html+=`<span class="${i==pno+1?'active':''}"><a href="#">${i}</a></span>`
          }
          $(".limit").children(":not(:first-child):not(:last-child)").remove();
          $(".limit").children().first().after(html);
          if(pno==0){
            $(".limit").children().first().addClass("disabled");
          }else{
            $(".limit").children().first().removeClass("disabled")
          }
          if(pno==pageCount-1){
            $(".limit").children().last().addClass("disabled")
          }else{
            $(".limit").children().last().removeClass("disabled")
          }
        }
      })
    }
    getProduct();
    $(".limit").on("click","a",function(e){
      e.preventDefault();
      var $a=$(this);
      if(!$a.parent().is(".disabled,.active")){
        if($a.parent().is(":first-child")){
          var no=pno-1;
        }else if($a.parent().is(":last-child")){
          var no=pno+1;
        }else{
          var no=$a.html()-1;
        }
        getProduct(no);
      }
    })
	}
})
