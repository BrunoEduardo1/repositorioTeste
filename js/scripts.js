$(document).ready(function () {
	//alert("teste");
	console.log("teste");	
/*
	$("#nomeInput").blur(function(){
		console.log("Olá");	
		alert($(this).val());	
	});
*/
	$("#nomeInput").keyup(function(){
		var a = $(this).val();
		if (a.length>= 2 && $("#alertaC").css("display") == "none") {
			$("#alertaC").fadeIn("slow");	

		} else if (a.length == 0) {
			$("#alertaC").fadeOut("slow");
		}
		$("#alertaC").html(a);
	});
		// body...
})
