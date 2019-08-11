/**
 * Classe Andar
 */
function Andar(numero){
	//Atributos
	this.posicao	= numero;
	this.botao		= 0; //0 = inativo - 1 = ativo
	
	//Métodos
	this.ativarBotao = function(){
		var bot = "#bot"+this.posicao;//botão do andar
		var pbot = "#pb"+this.posicao;//botão do painel
		if(this.botao == 0){
			$(bot).css("border", "#f55 solid 5px");
			$(pbot).css({border: "#5f5 solid 5px", color: "#5f5"});
			this.botao = 1;
			return true;
		}else
			return false;
	};
	this.desativarBotao = function(){
		var bot = "#bot"+this.posicao;//botão do andar
		var pbot = "#pb"+this.posicao;//botão do painel
		if(this.botao == 1){
			$(bot).css("border", "#fff solid 5px");
			$(pbot).css({border: "#fff solid 5px", color: "#fff"});
			this.botao = 0;
			return true;
		}else
			return false;
	};
//	this.chamarElevador = function(elevador){
//		var duracao = 
////		var este = this;
//		//desativando o botão e remover andar da fila de espera
////		$('#painel').animate({left: '400px'}, duracao, function(){//temporizador para retardar a ação
////			este.desativarBotao();
////		});
//		return duracao+2000;//Tempo de trajeto mais abertura de portas
//	};
};
