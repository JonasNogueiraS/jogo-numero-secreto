//let titulo = document.querySelector('h1');
//titulo.innerHTML = "Secret Number Game";
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = "Escolha um número entre 1 e 10";
let listaDeNumerosSorteados = [];
let limiteLista = 10;
let numeroAleatorio = gerarAleatorio()
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag)
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMsgInicial() {
    exibirTextoNaTela('h1', "Número Secreto");
    exibirTextoNaTela('p', "Escolha um número entre 1 e 10");   
}

exibirMsgInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    //console.log(numeroAleatorio == chute);
    if(chute == numeroAleatorio){
        exibirTextoNaTela('h1', "Você acertou!");
        let palavraTentativas = tentativas > 1? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', `${mensagemTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled')
    }else if(chute > numeroAleatorio){
        exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
    }else{
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
    }
    tentativas++;
    limparCampo();
}

function gerarAleatorio() {
    let numeroEscolhido = parseInt(Math.random()*limiteLista+1);
    let quantidadeDeNumerosEscolhidos = listaDeNumerosSorteados.length;
    if(quantidadeDeNumerosEscolhidos == limiteLista){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value= "";
}

function reiniciarJogo() {
    numeroAleatorio =gerarAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute("disabled", true);
}