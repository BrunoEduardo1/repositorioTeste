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

	 $("#galeria-btn-nav, #form-btn-nav").on('click', function(e) {
               // prevent default anchor click behavior
                e.preventDefault();

                // store hash
                var hash = this.hash;

                // animate
                $('html, body').animate({
                       scrollTop: $(hash).offset().top
                }, 500, function(){
                     // when done, add hash to url
                    // (default click behaviour)
                       window.location.hash = hash;
                     });
                }); 
		// body...
})
