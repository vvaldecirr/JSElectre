/**
 * Classe Elevador
 */
function Elevador(primeiroAndar){
	//Atributos
	this.porta		= 0; //0 = fechada - 1 = aberta
	this.sentido	= 1; //0 = descendo - 1 = subindo
	this.andar		= 1; //posição atual do elevador
	this.estado		= 0; //0 = parado - 1 = movimentando
	this.terreo		= primeiroAndar;
	this.andares	= new Array(0,0,0,0,0,0,0);
	//dosponibilizando o ponteiro do objeto atual para garantir acesso como variável global
	var este 		= this;
	
	//Métodos
	/**
	 * Abre a porta do elevador
	 */
	this.abrirPorta = function(){
      	if(this.porta == 0 && this.estado == 0){
			$('#portae').animate({left:'-35px'},2000);
			$('#portad').animate({right:'-35px'},2000);
			this.porta = 1;
			return 2000;
        }else
          	return 0;
	};
	
	/**
	 * Fecha a porta do elevador
	 */
	this.fecharPorta = function(){
      	if(this.porta == 1){
			$('#portae').animate({left:'0px'},2000);
			$('#portad').animate({right:'0px'},2000);
			this.porta = 0;
			return 2000;
        }else
          	return 0;
	};
	
	/**
	 * Inicia o trajeto do elevador para o andar de destino
	 */
	this.movimentar = function(andarDestino){
		//cálculo automático proporcional do tempo de viagem do elevador
		var tempoTrajeto = Math.abs(this.andar - andarDestino.posicao) * 1000;
		
		//cálculo automático da distância vertical do Elevador para o térreo em pixels
		var distancia = (this.andar - 1) * 116;

		var duracao = 0;
		duracao = this.fecharPorta();
		
		this.estado = 1; //elevador movimentando

		//movimentando o elevador
		$('#painel').animate({left: '400px'}, duracao, function(){//temporizador para retardar a ação
			for(i = 0; i < Math.abs(este.andar - andarDestino.posicao); i++){
				if(este.sentido == 1)
					distancia += 116; //acréscimo em um andar de altura
				else
					distancia -= 116; //decréscimo em um andar de altura
				$('#elevador').animate({bottom: distancia + "px"},1000, function(){
					//TODO: script que atualiza a prioridade na visitação do andar 
				});
			};
		});
		
		return tempoTrajeto;
	};
	
	/**
	 * Adiciona andares na fila de espera
	 */
	this.addAndar = function(andar){
		if(this.andares[andar.posicao] == 0){
			this.andares[andar.posicao] = andar;
			andar.ativarBotao();
			return true;
		}else
			return false;
	};
	
	/**
	 * Remove andares da fila de espera
	 */
	this.removeAndar = function(andar){
		if(typeof(this.andares[andar.posicao]) == "object"){
			this.andares[andar.posicao] = 0;
			andar.desativarBotao();
			return true;
		}else
			return false;
	};
	
	/**
	 * Gera texto com o estado atual da fila de espera
	 */
	this.getAndaresInfo = function(){
		var text = '';
		for(i = 1; i < this.andares.length; i++){
			if(typeof(this.andares[i]) == "object")
				text += "ID: "+i+" = "+this.andares[i].posicao+" em espera <br /> ";
			else
				text += "ID: "+i+" = free <br /> ";
		}
		return text;
	};
	
	/**
	 * Gera texto com o estado atual completo do Elevador
	 */
	this.getCompleteInfo = function(){
		var text = 'Porta: ';
		if(this.porta == 0)
			text += 'fechada';
		else
			text += 'aberta';
		
		text += '<br />Sentido: ';
		if(this.sentido == 0)
			text += 'descendo';
		else
			text += 'subindo';
		
		text += '<br />Estado: ';
		if(this.estado == 0)
			text += 'parado';
		else
			text += 'movimentando';
		
		text += '<br />Andar: ' + this.andar + '<br />';
		text += this.getAndaresInfo();
		return text;
	};
	
	/**
	 * Retorna o número do próximo andar da fila de espera segundo o sentido do elevador
	 */
	this.getProximoAndar = function(){
		if(this.sentido == 1){
			for (i = this.andar + 1; i < this.andares.length; i++){
				if(typeof(this.andares[i]) == "object")
					return this.andares[i];				
			};
		}else{
			for (i = this.andar - 1; i > 0; i--){
				if(typeof(this.andares[i]) == "object"){
					this.sentido = 0;
					return this.andares[i];				
				}
			};
		};
		return 0;
	};
//	this.getProximoAndar = function(){
//		if(this.sentido == 1){
//			for (i = this.andar + 1; i < this.andares.length; i++){
//				if(typeof(this.andares[i]) == "object")
//					return this.andares[i];				
//			};
//		}else{
//			for (i = this.andar - 1; i > 0; i--){
//				if(typeof(this.andares[i]) == "object")
//					return this.andares[i];				
//			};
//		};
//		return 0;
//	};
};