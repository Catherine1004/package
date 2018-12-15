$(function(){
  //全选和取消全选
  var $checkAll=$(".checkAll")
  var $checkeds=$(".checked")
  $checkAll.click(function(){
    $checkeds.prop("checked",this.checked);
    loadCart();
  })
  //加减 影响数量、小计、总金额
  var $items=$(".item-box");
  $items.on("click",".add,.reduce",function(){
    if($(this).hasClass("add")){
      var sum=$(this).prev().val();
      sum++;
      $(this).prev().val(sum);
    }else{
      var sum=$(this).next().val();
      if(sum>1){
        sum--;
        $(this).next().val(sum);
      }
    }
    var count=$(this).parent().children(".count").val();
    var price=$(this).parent().parent().prev().find(".price").html();
    var sumPrice=(count*price).toFixed(2);
    $(this).parent().parent().next().children(".totalPrice").html("￥"+sumPrice);
    loadCart()
  })
  //删除
  $items.on("click",".delete",function(){
    var $item=$(this).parent().parent();
    if(confirm("确定删除吗？")){
      $item.remove();
    }
    loadCart();
  })
  $items.on("click",".checked",function(){
    loadCart();
  })
  //封装函数，计算总计

  function loadCart(){
    var isChecked=true;
    $checkeds.each(function(i,input){
      if(!input.checked){
        isChecked=false;
      }
      console.log(isChecked)
    })
    $checkAll.prop("checked",isChecked);
    //选中商品，影响总计
    var $checked=$(".checked:checked");
    var totalPrice=0;
    var totalCount=0;
    for(var i=0;i<$checked.length;i++){
      var count=parseInt($($checked[i]).parent().parent().find(".count").val());
      var price=$($checked[i]).parent().parent().find(".price").html();
      //console.log(count,price)
      totalPrice+=count*price;
      //console.log(totalPrice);
    }
    $(".subtotal>span").html(totalPrice.toFixed(2));
  }
})