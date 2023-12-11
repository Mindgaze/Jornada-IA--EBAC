///Gera um numero aleatorio entre 'min' e 'max'///
function randonRange(min,max){
    return Math.random() * (max-min) + min;
}

///Função de Interpolação Linear// A interpolação linear é uma forma de adivinhar um valor entre dois números que você já conhece. Imagine esses dois números como pontos em uma linha. Se você quer encontrar um número entre esses dois pontos, a interpolação linear faz isso usando uma fórmula simples. Basicamente, ela "liga os pontos" de forma reta para pegar o valor intermediário. É muito útil quando precisamos de valore entre dois números conhecidos.
///Calcular Valor intermediario  a e b com base em t
function lerp(a, b, t){
return a + (b-a)* t;
}
///Construir o Neuronio///
class Neuron{
    constructor(inputs){
        ///inicializa o neuronio com um viés(bias) aleatorio  entre (-1 e 1). O viés atuará como mecanismo de aprendizado, adptando a IA a base de dados e mudanças no neuronio permitindo maior aperfeiçoar o enetndimento dos dados e a toamda de decisão   
  this.bias = randonRange(-1,1); 
////Inicializa uma lista de pesos com valores aleatorios entre (-1,1)-O weightList no nosso caso, vai servir para atribuir importância a diferentes entradas, ajudando a nossa rede a aprender e tomar decisões com base nos dados que entram.
this.weightList = new Array(inputs)
.fill()
.map(()=> randonRange(-1,1));
};

///Função que calcula saída do Neuronio(ativação)
g(signaList=[]){
    let u= 0;
    ////Calcula soma ponderada dos sinais de entrada multiplicados pelos pesos
for(let i = 0; i < this.weightList.lenght; i++){
    u += signaList[i] *  this.weightList[i];
}
////Verifica se o neuronio esta ativado com base em uma função tangente
if(Math.tanh(u) > this.bias)
///Ativado
return 1;
///Desativado
else return 0;
}

///Função que realiza mutações no peso e viés do neuronio-O método .map() no JavaScript serve para criar uma nova lista usando a informação de uma lista original.
mutate(rate=1){
    this.weightList = this.weightList.map((w) =>{
        ///faz a mudança nos pesos com base no rate
        return lerp(w, randonRange(-1,1), rate);});
        ///faz uma mudança no viés com base no rate
        this.bias = lerp(this.bias, randonRange(-1,1),rate)
    }
}
////Definição de Classe RNA////
class RNA{
    constructor(inputCount=1, levelList = []){
        ///Incializa pontuação RNA como Zero
        this.score = 0;
        //////Cria camada de neuronios com base em especificações
        this.levelList = levelList.map((l,i) => {
            ////Calcula tamanho da camada atual
            const inputSize = 1 === 0 ? inputcount : levelList[i-1]
            ////Cria uma camada de neuroniso com o tamanho calculado
            return new Array(1).fill().map(() => new Neuron(inputSize)); 
        });
    }
    
    /////Calcula a saída da RNA com base nos sinais de entrada///
    compute(list = []) {
        for(let i = 0 ; i < this.levelList.lenght; i++){
            const tempList = [];
            ////calclula saida de cada neuronio na camada atual e indica erros
            for( const neuron of this.levelList[i]){
                if( list.lenght !== neuron.weightList.lenght) throw new Error('Entrada Invalida');
                tempList.push(neuron.g(list));

            }
            /////Atualiza sinais de entrada para proxima camada
            list = tempList;  
        }
        ///// Retorna saída final da RNA
        return list;
    }

    ////Função que realiza mutações nos neuronios da RNA////
    mutate(rate=1){
        for(const level of this.levelList){
            for(const neuron of level)neuron.mutate(rate);
    }

}

///Função para carregar a configuração de uma RNA existente///
load(rna) {
    if(!rna) return;
    try{
        this.levelList = rna.map((neuronList) => {
            return neuronList.map((neuron) => {
            ////Cria novos Neuronios com base nos dados da RNA carregada
            const n = new Neuron();
            n.bias = neuron.bias;
            n.weightList = neuron.weightList;
            return n;

        });
    });
   
    //////`catch (e)` é vai ser usado para capturar e lidar com erros em JavaScript, permitindo que você tome decições específicas quando acontece uma exceção durante a execução do código. ////
} catch(e){
    return;
 }
}

/////Função para salvar configuração atual da RNA////
save(){
    return this.levelList;
 }
}

////Exporta a classe RNA como o valor padrão do modulo///
export default RNA;