/**
 * Classe Controlador 
 */
function Controlador(){
	//Atributos (não possui atributos por receberá direto por parâmetro)
	var este = this;
	
	//Métodos (regras definidas nos casos de uso)
	this.solicitarServico = function(elevador, andar){
		/**
		 * Se o andar já estiver na fila de espera ou se já está 
		 * no andar solicitado, não executar solicitarServico
		 * exceto se for o primeiro andar
		 */
		if(elevador.andar == andar.posicao && elevador.andar != 1){
			$("#info").html("<h3>Status do elevador</h3><br />Elevador já foi chamado!");
			return;
		};
		
		//adicionando andar na fila de espera 
		elevador.addAndar(andar);		
		
		//permitir somente se elevedor estiver parado
		if(elevador.estado == 0){
			
			//Seguir para o próximo andar da fila
			var tempoTrajeto = elevador.movimentar(elevador.getProximoAndar());
			
			//atualizando mural de informações do elevador no browser
			$("#info").append("<br />" + elevador.getCompleteInfo() + "<hr>");
			
			//rotina de chegada do elevador ao destino
			$('#painel').animate({left: '400px'}, tempoTrajeto, function(){//temporizador para retardar a ação
				elevador.estado = 0;
				elevador.abrirPorta();			
				elevador.andar = andar.posicao;
				elevador.removeAndar(andar);
				andar.desativarBotao();
				
				/**se não tiver outro andar em espera ou o elevador está no último andar ou se tiver
				 * um andar abaixo em espera ou andar atual não é o primeiro, sentido desce.
				 */			
				if(elevador.getProximoAndar() == 0 && elevador.andar != 1 || elevador.andar == elevador.andares.length-1)				
					elevador.sentido = 0;
				else
					elevador.sentido = 1;
				//
				$('#painel').animate({left: '400px'}, 5000, function(){//temporizador para retardar a ação
					if(typeof(elevador.getProximoAndar()) == "object")
						este.solicitarServico(elevador, elevador.getProximoAndar());
					else{
						if(elevador.andar != 1)
							este.solicitarServico(elevador, elevador.terreo);
						else{
							elevador.fecharPorta();
							$("#info").append("<br />" + elevador.getCompleteInfo() + "<hr>");
						};
					};
				});
			});
			
			//atualizando mural de informações do elevador no browser
			$('#painel').animate({left: '400px'}, tempoTrajeto, function(){//temporizador para retardar a ação
				$("#info").html("<h3>Status do elevador</h3><br />" + elevador.getCompleteInfo() + "<hr>");
			});
		}else
			$("#info").append("<br />Solicitação registrada [andar " + andar.posicao + "]!<br />");
	};
};