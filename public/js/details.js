$(function(){
  if(location.search.indexOf("lid=")!=-1){
    var lid=location.search.split("=")[1];
    console.log(lid);
    (async function(){
      var res=await $.ajax({
        url:"http://localhost:9000/details",
        type:"get",
        data:{lid},
        dataType:"json"
      })
      //console.log(res);
      var {product,pics,specs}=res;
      var {title,subtitle,price,promise,sname}=product;
      console.log(pics);
      var divPro=document.querySelector(".pro");
      divPro.children[0].innerHTML=title;
      divPro.children[1].innerHTML=subtitle;
      divPro.children[2].children[0].innerHTML="￥"+price.toFixed(2);
      divPro.children[2].children[1].children[1].innerHTML=price.toFixed(2)
      divPro.children[4].innerHTML=promise;
			$(".f-name").children(":nth-child(2)").html(`&nbsp;/&nbsp; ${sname}`);
			$(".f-name").children(":nth-child(3)").html(`&nbsp;/&nbsp; ${title}`);

      var html="";
			console.log(specs);
      for(var sp of specs){
        if(sp.spec!==""){
          html+=`<a href="product_details.html?lid=${sp.lid}" class="spec  ${sp.lid==lid?'active':''}">${sp.spec}</a>`;
        }
      }
      //console.log(html);
      $(".specs").html(html);
      var ul=document.querySelector("#imgList").children[0];
      //console.log(ul);
      var html="";
      for(var pic of pics){
        html+=`<li><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>`
      }
      $(ul).html(html);
      var mImg=$("#mask").prev();
      console.log(mImg);
      mImg.attr("src",pics[0].md)
      //console.log(mImg);
      var $lgDiv=$("#div-lg");
      $lgDiv.css("backgroundImage",`url(${pics[0].lg})`);
      $lgDiv.css("backgroundRepeat","no-repeat");

      //鼠标进入每个小图片，切换中图片和大图片
      $(ul).on("mouseover","img",function(e){
        var img=e.target;
        var md=$(img).attr("data-md");
        var lg=$(img).attr("data-lg");
        mImg.attr("src",md);
        $lgDiv.css("backgroundImage",`url(${lg})`);
				$lgDiv.css("backgroundRepeat","no-repeat");
      })


      //放大镜
      var $mask=$("#mask");
      var $smask=$("#super-mask");
      var mSize=176,
          Max=460-mSize;
      $smask.hover(function(){
        $mask.toggleClass("d-none");
        $lgDiv.toggleClass("d-none");
      })
      $smask.mousemove(function(e){
        var left=e.offsetX-mSize/2;
        var top=e.offsetY-mSize/2;
        if(left<0){
          left=0;
        }else if(left>Max){
          left=Max;
        }
        if(top<0){
          top=0;
        }else if(top>Max){
          top=Max;
        }
        $mask.css({left,top});
        $lgDiv.css("background-position",`-${23/17*left}px -${23/17*top}px`)
      })
    })()
  }
})