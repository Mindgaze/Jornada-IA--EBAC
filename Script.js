import utils from './utils.js';
import RNA from './RNA.js';
import controls from './controls.js';

/////Numero de amostras(agentes) no algorismo gentico///
const SAMPLES = 20; 

////instancia do jogo runner//
const game = runner.instance_;

////Lista vazia de dinos///
let dinoList = [];

////Indice atual de dinos na lista///
let dinoIndex = 0;

///// Melhor score durante o treinamento
let bestScore = 0;

//////Melhor RNA
let bestRNA = null;

////Parametros da Lista de Dinos///
function fillDinoList() {
    ///// Estabelece variavel de contagem e criação de dinos caso DinoList ainda não atingiu o SAMPLES
    for (let i = 0; i < SAMPLES; I++){
    //////Estabelece que cada Sample da dinoList tera uma RNA de 3 camadas dentro do parametro importado
dinoList[i] = new RNA(3, 10, 10,2);
/////Estabelece que a dinoList carregará a  melhor RNA salvada anteriormente
dinoList[i]. load(bestRNA);
////Estabelece que, exceto o primeiro, cada dino na dinoList terá uma taxa de mutação
if(i > 0) dinoList[i].mutate(0.5);
   }
   console.log('Dino List created!');
}
//////Parametros de atuação e treino da IA////
setTimeout(() => {
    fillDinoList();
    ////Faz o dino Pular
    controls.dispatch('jump');
}, 1000);

setInterval(() => {
    if (!game.activeted) return;
    //////Seleciona o dino atual
    const dino = dinoList[dinoIndex]; 
    //////Verifica se o Dino colidiu e grava se o desemponho foi melhor que o antecessor
if(game.crashed){
    if(dino.score > bestScore){
        bestScore = dino.score;
        bestRNA = dino.save();
        console.log('best score: ', bestScore);
    }
//////Update Lista de Dinos
    dinoIndex++;
    
    ////Verifica se todos os itens da Lista de Dino "tiveram sua chance" e prenche a lista novamente
    if(dinoIndex === SAMPLES){
    fillDinoList();
dinoIndex = 0;
bestScore = 0;
}
/////reinicia o jogo
game.restart();
}

////Gera as variaveis para situar o Dino Espacialmente
const { tRex, horizon, currentSpeed, distanceRan, dimensions } = game;
/////Calcula a Pontuação
dino.score = distanceRan - 2000
////Situa o Dino espacialmente
const player = {
    x: tRex.xPos,
    y: tRex.yPos,
    speed : currentSpeed,
};
////Mapeia os Obstaculos
const [obstacle] = horizon.obstacles
.map((obstacle ) => {
    return {
        x: obstacle.xPos,
        y: obstacle.yPos
    }
})
////Mapeia obstaculo em relação ao player
.filter((obstacle) => obstacle.x > player.x )
////Verfica se ha um obsatculo presente
if (obstacle){
    ///distancia relativa entre o jogador e o obstaculo
const distance = 1- ( utils. getDistance(player,obstacle)/dimensions.WIDTH );
/////velocidade relativa do jogador
const speed = player.speed/6;
////Altura relativa do jogador
const height = Math.tanh(105 - obstacle.y);

///Processa as informações no dino atual 
const [jump,crouch] = dino.compute([
    distance,
    speed,
    height,
]);
////Executa ações com base na probalidade de pular ou agachar
/////Dinos não age se jump = crounch
if (jump === crouch) return;
////Dino pula se jump tiver probabilidade verdadeira
if(jump) controls.dispatch('jump') ;
////dino agacha se cronuch tiver probalidade verdadeira
if(crouch) controls.dispatch('crounch')
}  
},100)
////Ativação
/* const s = document.createElement('script')
s.type = 'module';
s.src = 'http://localhost:5500/script.js';
document.body.appendChild(s); */