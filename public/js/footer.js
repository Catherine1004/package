$(function(){
	$("<link rel='stylesheet' href='css/footer.css'>").appendTo("head")
	$.ajax({
		url:"http://localhost:9000/footer.html",
		type:"get",
		success:function(res){
			$("#footer").html(res)
		}
	})
})