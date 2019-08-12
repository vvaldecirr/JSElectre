/**
 * CAMADA DE INTERFACE DA VIEW COM O CONTROLADOR
 */
$(document).ready(function(){//Atributo JQuery que só permite a execução apóes completa carga do sistema
	//Instanciando cada andar do prédio
	var andar1 = new Andar(1);
	var andar2 = new Andar(2);
	var andar3 = new Andar(3);
	var andar4 = new Andar(4);
	var andar5 = new Andar(5);
	var andar6 = new Andar(6);
	
	//Instanciando o único elevador do prédio
	var elevador1 = new Elevador(andar1);
	
	//Instanciando o Controlador
	var controlador = new Controlador();
	
	//Vinculando ações dos botões ao Controlador
	$("#bot1, #pb1").click(function(){
		controlador.solicitarServico(elevador1, andar1);		
	});
	$("#bot2, #pb2").click(function(){
		controlador.solicitarServico(elevador1, andar2);		
	});
	$("#bot3, #pb3").click(function(){
		controlador.solicitarServico(elevador1, andar3);		
	});
	$("#bot4, #pb4").click(function(){
		controlador.solicitarServico(elevador1, andar4);		
	});
	$("#bot5, #pb5").click(function(){
		controlador.solicitarServico(elevador1, andar5);		
	});
	$("#bot6, #pb6").click(function(){
		controlador.solicitarServico(elevador1, andar6);		
	});
	
	$("#info").append("<br />" + elevador1.getCompleteInfo() + "<hr>");
	
//	elevador1.addAndar(andar5);
//	elevador1.removeAndar(andar5);
	
//	alert(elevador1.getAndaresInfo());
	
//	$.each(elevador1.andares, function(key, value){
//		alert( key + ": " + value );
//	});
	
	//Hover do mouse no painel do elevador
//	$("#painel div").on({
//		mouseenter: function(){
//			$(this).css("border", "#ff5 solid 5px");
//		},
//		mouseleave: function(){
//			$(this).css("border", "#fff solid 5px");
//		} 
//	});
});