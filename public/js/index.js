$(function(){
  $.ajax({
    url:"http://localhost:9000/index/",
    type:"get",
    dataType:"json",
    success:function(res){
      //console.log(res);
      var html="";
      for(var p of res){
        var {title,price,href,pic}=p;
        html+=`<div class="box">
          <span class="hot">热销</span>
          <div class="pro">
            <div><a href="${href}"><img src="${pic}" alt="${title}"></a></div>
            <div>
              <div class="name"><a href="${href}" title="${title}">${title}</a></div>
              <div class="price">
                <span>￥</span>
                <span class="price-d">${price}</span>
              </div>
            </div>
          </div>
        </div>`
      }
      var divCard=document.getElementById("card_1").nextElementSibling;
      //console.log(divCard);
       $(divCard).html(html);
    }
  })
  

})

// 楼层滚动
var $navbar=$(".navbar")
var $floors=$(".floor")
$(window).scroll(function(){
  var scrolltop=$(window).scrollTop();
  if(scrolltop>=420){
    $navbar.show();
    $floors.each(function(i,f){
      var $f=$(f);
      var offsetTop=$f.offset().top;
      if(offsetTop<=scrolltop+innerHeight/2-50){
        $navbar.children(`.f-item:eq(${i})`).addClass("nav-hover").siblings().removeClass("nav-hover")
      }
    })
  }else{
    $navbar.hide();
  }
})

$navbar.on("click",".f-item",function(e){
  e.preventDefault();
  var i=$(this).index();
  var offsetTop=$($floors[i]).offset().top;
  $("html").stop(true).animate({
    scrollTop:offsetTop
  },2000)
})

/* 广告弹出 */
var $divAdv=$(".adv");
var i=10;
var timer=setInterval(function(){
  i--;
  $(".advTime").html(`广告弹出${i}s后关闭`);
  if(i==0){
    clearInterval(timer);
    timer=null;
    $divAdv.css("display","none");
  }
},1000)
/*点击×，关闭广告*/
$divAdv.on("click","button",function(){
    clearInterval(timer);
    $divAdv.css("display","none");
  })

