window.onload=function(){
			btnVolta=document.getElementById("btnVolta");
			btnVolta.style.display="none";
			
			btnReinicia=document.getElementById("btnReinicia");
			btnReinicia.style.display="none";

			btnComeca=document.getElementById("btnCarrega");
			controlefora=0;
			
			areaPontuacao=document.getElementById("areaPontuacao");

			pontuacaoAtual=document.getElementById("pontuacaoAtual");
			
			areasco=document.getElementById("areaScore");
			score=document.getElementById("score")
			areasco.style.display="none"


			primeiro=terceiro=segundo=0;

			return[btnVolta,btnReinicia,btnComeca,controlefora,primeiro,segundo,terceiro,pontuacaoAtual,areaPontuacao];
		}
		

		function carregaJogo(){
			btnReinicia.style.display="flex";
			btnVolta.style.display="flex";
			btnComeca.style.display="none";

			stage=document.getElementById("area");			
			ctx=stage.getContext("2d");
			document.addEventListener("keydown",keyPush);
			stage.style.display="flex";

			timerid=setInterval(atualizaJogo, 80);

			const vel=1;
			vx= vy=0;
			px = py=0;
			tamanhoQuad=20;
			quantidadeQuad=20;
			macaX=macaY=15;

			pontuacao=0;

			trail=[];
			tail=5;
			function atualizaJogo(){
				px+=vx;
				py+=vy;

				if(px<0){
					px=quantidadeQuad-1;
				}
				if(px>quantidadeQuad-1){
					px=0;
				}
				if(py<0){
					py=quantidadeQuad-1;
				}
				if(py>quantidadeQuad-1){
					py=0;
				}


				ctx.fillStyle="green";	
				ctx.fillRect(0,0, stage.width, stage.height);
				
				ctx.fillStyle="red";
				ctx.fillRect(macaX*tamanhoQuad,macaY*tamanhoQuad,tamanhoQuad,tamanhoQuad);

				ctx.fillStyle="lightgray";

				for (var i = trail.length - 1; i >= 0; i--) {
					ctx.fillRect(trail[i].x*quantidadeQuad,trail[i].y*quantidadeQuad,tamanhoQuad,tamanhoQuad);
					if(trail[i].x==px&&trail[i].y==py){
						tail=5;
						vx=vy=0;
						px=py=0
						pontuacao=0;
						console.log("parado");

					}
				}

				trail.push({x:px , y:py});
                
                while (trail.length > tail) {
                    trail.shift();
                }
				
				if(macaX==px&&macaY==py){
					tail++;
					pontuacao+=50
					macaX=Math.floor(Math.random()*quantidadeQuad);
					macaY=Math.floor(Math.random()*quantidadeQuad);
					score.innerHTML=pontuacao

					verificaPontuacao();
								
				
				}
				console.log(pontuacao)
				return[stage,pontuacao]
			}

			
			function keyPush(event){
				switch(event.keyCode){
					case 37:
						vx=-vel;
						vy=0;
						break;
					case 38:
						vx=0;
						vy=-vel;
						break;
					case 39:
						vx=vel;
						vy=0;
						break;
					case 40:
						vx=0;
						vy=vel;
						break;
					case 65:
						vx=-vel;
						vy=0;
						break;
					case 87:
						vx=0;
						vy=-vel;
						break;
					case 68:
						vx=vel;
						vy=0;
						break;
					case 83:
						vx=0;
						vy=vel;				


				}
			}
			areaPontuacao.style.display="none";
			areasco.style.display="flex"

			return[timerid];
		}

		function encerraJogo(){	
			clearInterval(timerid)
		}

		function reiniciaJogo(){
				vx = vy=0;
				const vel=1;
				px=py=0;
				macaX=macaY=15;
				pontuacao=0;
				score.innerHTML=""
				console.log("Jogo reiniciado");
			}

		function voltaMenu(){
			stage.style.display="none";
			btnVolta.style.display="none";
			btnComeca.style.display="flex";
			btnReinicia.style.display="none";
			areaPontuacao.style.display="none";
			areasco.style.display="none";
			
			encerraJogo()
		}

		function verificaPontuacao(){
			if(pontuacao>primeiro){
					terceiro=segundo
					segundo=primeiro
					primeiro=pontuacao;
					console.log("primeira posição atualizada")
				}else if(pontuacao<primeiro&&pontuacao>segundo){
					terceiro=segundo
					segundo=pontuacao
					console.log("primeira posição atualizada")

				}else if(pontuacao<segundo&&pontuacao<primeiro&&pontuacao>terceiro){
					terceiro=pontuacao
					console.log("terceira posição atualizada")

				}
				pontuacaoAtual.innerHTML=pontuacao	
				
				
								
				return[primeiro,segundo,terceiro,pontuacao]
		}

		function verPontuacao(){
			try{
				voltaMenu();
			}catch(stage){
				areaPontuacao.style.display="block"	;			
			}finally{
				areaPontuacao.style.display="block"	;
				btnVolta.style.display="flex";

				areaPri=document.getElementById("primeiroLugar");
				areaSeg=document.getElementById("segundoLugar");
				areaTer=document.getElementById("terceiroLugar");
				areaPri.innerHTML=primeiro;
				areaSeg.innerHTML=segundo;
				areaTer.innerHTML=terceiro;
				
			}
			
		}