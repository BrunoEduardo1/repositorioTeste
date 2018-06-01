$(document).ready(function () {
	
	console.log("js Carregado");	

	/*Slider*/
	$('.slider').bxSlider();
	/*mascaras*/
	$('.data').mask('00/00/0000');
	$('.cpf').mask('000.000.000-00');
    $('.cep').mask('00000-000');
	//validar CPF
	$('.cpf').blur(function (){
        $(this).attr('required','true');
		if ($(this).val()==null){

		}else{
			if(TestaCPF($(this).val())==false){
				//alert('cpf incorreto!');
                $('#campocpf').addClass('is-invalid');
                //$('#formHide').fadeOut(500);
			}else{
                //mostra a segunda parte do formulário se o cpf é válido
                $('#formHide').fadeIn(1000); 
                //feedack 
                $('#campocpf').removeClass('is-invalid');
			}
		}
	});
    //verifica se a data é existente
    $('#datanas').blur(function (){
        $(this).attr('required','true');
        $('.cpf').attr('required','true');
        var dataOBJ = new Date();
        var testeData = $(this).val();
        var today = dataOBJ.getDate()+'/'+(dataOBJ.getMonth()+1)+'/'+dataOBJ.getFullYear();
        // || (testeData[4]>today[3] && testeData[7]==today[6]) 2008 prob
        if (testeData<'01/01/1900'|| testeData>=today || testeData[3]>1) {
            $('#datanas').addClass('is-invalid');
            $('#datainvalida').text('Data invalida');
            //não impede a retirada do required
            $('#datanas').val(null);   
        }
            if (testeData=="") {
                console.log('sem data');
                $('#datanas').removeClass('is-invalid');
            } else if (testeData[0]>3 || (testeData[0]==3 && testeData[1]==2)){
                console.log('dia invalido');
            }
    
    });
    //fim verifica se a data é existente

   


	//animação de scroll
	 $("#galeria-btn-nav, #form-btn-nav").on('click', function(e) {
               // prevent default anchor click behavior
                e.preventDefault();

                // store hash
                var hash = this.hash;

                // animate
                $('html, body').animate({
                       scrollTop: $(hash).offset().top
                }, 500, function(){
                     //add hash to url
                    //(default click behaviour)
                       window.location.hash = hash;
                     });
                }); 
	
	
	 function limpa_formulario_cep() {
        // Limpa valores do formulário de cep.
        $("#endereco").val("");
        $("#cep").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#estado").val("");
    }

    $(".cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereco").val("...");
                $("#bairro").val("...");                    
                $("#cidade").val("...");
                $("#estado").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#estado").val(dados.uf); 
                        $('#cep').removeClass('is-invalid');                           
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulario_cep();
                        //alert("CEP não encontrado.");
                        $('invalid-feedback').show();
                        $('#cep').addClass('is-invalid');
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulario_cep();
                //alert("Formato de CEP inválido.");
                $('#cep').addClass('is-invalid');
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulario_cep();
        }
    });



});

function TestaCPF(val) {
    if (val.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/) != null) {
        var val1 = val.substring(0, 3);
        var val2 = val.substring(4, 7);
        var val3 = val.substring(8, 11);
        var val4 = val.substring(12, 14);

        var i;
        var s;
        var c;
        var number;
        var result = true;

        number = (val1 + val2 + val3 + val4);

        s = number;
        c = s.substr(0, 9);
        var dv = s.substr(9, 2);
        var d1 = 0;

        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (10 - i);
        }

        if (d1 == 0)
            result = false;

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;

        if (dv.charAt(0) != d1)
            result = false;

        d1 *= 2;
        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (11 - i);
        }

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;

        if (dv.charAt(1) != d1)
            result = false;
            
		if(val == "111.111.111-11" || val == "222.222.222-22" || val == 
    "333.333.333-33" || val == "444.444.444-44" || val == "555.555.555-55" || val == 
    "666.666.666-66" || val == "777.777.777-77" || val == "888.888.888-88" || val == 
    "999.999.999-99" || val == "000.000.000-00" ){
	    	result = false;
	    }

        return result;
    }

    return false;
}
