//MUDAR: colocar obrigatório responder, colocar botão página anterior

//AVISAR EM ALGUMA TELA ANTERIOR QUANTAS PERGUNTAS TÊM O FORMULÁRIO E COMO VAI FUNCIONAR

//o questionário é um objeto divido em "blocos". Cada bloco é um tema. Cada bloco desse tem um título, texto explicativo sobre o que é aquele bloco e um array de perguntas

const questionario = {
    paixao: {
        titulo: "PAIXÃO",
        textoExplicativo: "Aquilo que você ama.",
        perguntas: [
            "1) O que você faria de graça?",
            "2) O que você faz que te faz sentir mais vivo?"
        ]
    },
    talento: {
        titulo: "TALENTO",
        textoExplicativo: "Aquilo que você é bom.",
        perguntas: [
            "3) O que você faz com facilidade?",
            "4) Em que os outros pedem a sua ajuda?"
        ]
    },
    missao: {
        titulo: "MISSÃO",
        textoExplicativo: "O que o mundo precisa?",
        perguntas: [
            "5) Como você gostaria de contribuir com o mundo?",
            "6) Que mudança você gostaria de ver no mundo?"
        ]
    },
    legado: {
        titulo: "LEGADO",
        textoExplicativo: "Do que você se orgulha?",
        perguntas: [
            "7) Que habilidades suas são valorizadas?",
            "8) Quais delas poderiam gerar renda ou conhecimento?"
        ]
    }
}

//local para armazenar as respostas das perguntas (claude gerou, não sei como vcs vão fazer)
const respostas = {
    paixao: {},
    talento: {},
    missao: {},
    legado: {}
}

const container = document.getElementById('container');
const arrayTemas = [ "paixao", "talento", "missao", "legado" ]; //defini o array porque já sei os temas de cada pergunta (não mudam)
let indiceTemaAtual = 0; //vou ir percorrendo o array com essa var


//essa é uma função para fazer o tema aparecer na tela da pessoa sem eu ter que criar várias páginas para isso
function renderizarTema(index) {

    const tema = arrayTemas[index]; //tema = "raizes", "frutos" etc (string)
    const configuracao = questionario[tema]; // configuracao = { titulo, perguntas... }

    container.innerHTML = ''; //serve para limpar o html, aparentemente

    const tituloTema = document.createElement('p');
    tituloTema.className = 'tema';
    tituloTema.textContent = configuracao.titulo;
    container.appendChild(tituloTema);

    const descricaoTema = document.createElement('p');
    descricaoTema.className = 'explicacaoTema';
    descricaoTema.textContent = configuracao.textoExplicativo;
    container.appendChild(descricaoTema);

    const divPergunta = document.createElement('div');
    configuracao.perguntas.forEach(item => {
        const pergunta = document.createElement('p');
        pergunta.className = 'textoPergunta';
        pergunta.textContent = item;
        divPergunta.appendChild(pergunta);

        const divEspacoResposta = document.createElement('textarea');
        divEspacoResposta.id = 'inputPergunta';
        divEspacoResposta.placeholder = "Digite sua resposta aqui";
        divEspacoResposta.maxLength = 300;
        divEspacoResposta.type = "text";

        divPergunta.appendChild(divEspacoResposta);
    });
    container.appendChild(divPergunta);


    if (tema === "legado") {
        const botaoFinalizar = document.createElement('button');
        botaoFinalizar.className = "botaoFinalizar";
        botaoFinalizar.textContent = "Finalizar";
        container.appendChild(botaoFinalizar);

        botaoFinalizar.addEventListener('click', () => { //claude gerou
            const inputs = document.querySelectorAll('.inputPergunta');

            inputs.forEach((input, i) => {
                const indiceGlobal = configuracao.indiceInicial + i;
                respostas[tema][indiceGlobal] = input.value;
            });

            console.log("Respostas finais:", respostas); // trocar pelo que você quiser fazer com os dados
        });

    } else {
        const botaoProximo = document.createElement('button');
        botaoProximo.className = "botaoProximo";
        botaoProximo.textContent = "Próximo";
        container.appendChild(botaoProximo);

        botaoProximo.addEventListener('click', () => { //claude gerou 
            const inputs = document.querySelectorAll('.inputPergunta');

            inputs.forEach((input, i) => {
                const indiceGlobal = configuracao.indiceInicial + i;
                respostas[tema][indiceGlobal] = input.value;
            });

            indiceTemaAtual++;
            renderizarTema(indiceTemaAtual);
        });
    }
}

renderizarTema(indiceTemaAtual);