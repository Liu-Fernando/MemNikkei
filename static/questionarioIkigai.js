//MUDAR: colocar obrigatório responder, colocar botão página anterior

//AVISAR EM ALGUMA TELA ANTERIOR QUANTAS PERGUNTAS TÊM O FORMULÁRIO E COMO VAI FUNCIONAR

//o questionário é um objeto divido em "blocos". Cada bloco é um tema. Cada bloco desse tem um título, texto explicativo sobre o que é aquele bloco e um array de perguntas

const questionario = {
    paixao: {
        titulo: "PAIXÃO",
        textoExplicativo: "Aquilo que você ama.",
        indiceInicial: 0,
        perguntas: [
            "1) O que você faria de graça?",
            "2) O que você faz que te faz sentir mais vivo?"
        ]
    },
    talento: {
        titulo: "TALENTO",
        textoExplicativo: "Aquilo que você é bom.",
        indiceInicial: 2,
        perguntas: [
            "3) O que você faz com facilidade?",
            "4) Em que os outros pedem a sua ajuda?"
        ]
    },
    missao: {
        titulo: "MISSÃO",
        textoExplicativo: "O que o mundo precisa?",
        indiceInicial: 4,
        perguntas: [
            "5) Como você gostaria de contribuir com o mundo?",
            "6) Que mudança você gostaria de ver no mundo?"
        ]
    },
    legado: {
        titulo: "LEGADO",
        textoExplicativo: "Do que você se orgulha?",
        indiceInicial: 6,
        perguntas: [
            "7) Que habilidades suas são valorizadas?",
            "8) Quais delas poderiam gerar renda ou conhecimento?"
        ]
    }
}

//local para armazenar as respostas das perguntas
const respostas = {
    paixao: {},
    talento: {},
    missao: {},
    legado: {}
}

const container = document.getElementById('container');
const arrayTemas = [ "paixao", "talento", "missao", "legado" ]; //defini o array porque já sei os temas de cada pergunta (não mudam)
let indiceTemaAtual = 0; //vou ir percorrendo o array com essa var


//salva as respostas que estão na tela no objeto `respostas`
function salvarRespostasAtuais(tema, configuracao) {
    const inputs = document.querySelectorAll('.inputPergunta');
    inputs.forEach((input, i) => {
        const indiceGlobal = configuracao.indiceInicial + i;
        respostas[tema][indiceGlobal] = input.value;
    });
}

//essa é uma função para fazer o tema aparecer na tela da pessoa sem eu ter que criar várias páginas para isso
function renderizarTema(index) {

    const tema = arrayTemas[index]; //tema = "paixao", "talento" etc (string)
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
    configuracao.perguntas.forEach((item, i) => {
        const pergunta = document.createElement('p');
        pergunta.className = 'textoPergunta';
        pergunta.textContent = item;
        divPergunta.appendChild(pergunta);

        const divEspacoResposta = document.createElement('textarea');
        divEspacoResposta.className = 'inputPergunta';
        divEspacoResposta.placeholder = "Digite sua resposta aqui";
        divEspacoResposta.maxLength = 300;

        //pré-preenche se o usuário já respondeu antes (caso tenha voltado)
        const indiceGlobal = configuracao.indiceInicial + i;
        if (respostas[tema][indiceGlobal]) {
            divEspacoResposta.value = respostas[tema][indiceGlobal];
        }

        divPergunta.appendChild(divEspacoResposta);
    });
    container.appendChild(divPergunta);

    //grupo de botões (Voltar + Próximo/Finalizar)
    const grupoBotoes = document.createElement('div');
    grupoBotoes.className = 'grupoBotoes';

    //botão Voltar aparece em todos menos no primeiro tema
    if (index > 0) {
        const botaoVoltar = document.createElement('button');
        botaoVoltar.className = "botaoVoltar";
        botaoVoltar.textContent = "Voltar";
        grupoBotoes.appendChild(botaoVoltar);

        botaoVoltar.addEventListener('click', () => {
            salvarRespostasAtuais(tema, configuracao);
            indiceTemaAtual--;
            renderizarTema(indiceTemaAtual);
        });
    }

    if (tema === "legado") {
        const botaoFinalizar = document.createElement('button');
        botaoFinalizar.className = "botaoFinalizar";
        botaoFinalizar.textContent = "Finalizar";
        grupoBotoes.appendChild(botaoFinalizar);

        botaoFinalizar.addEventListener('click', () => {
            salvarRespostasAtuais(tema, configuracao);
            console.log("Respostas finais:", respostas); // próximo passo: enviar para o Flask
        });

    } else {
        const botaoProximo = document.createElement('button');
        botaoProximo.className = "botaoProximo";
        botaoProximo.textContent = "Próximo";
        grupoBotoes.appendChild(botaoProximo);

        botaoProximo.addEventListener('click', () => {
            salvarRespostasAtuais(tema, configuracao);
            indiceTemaAtual++;
            renderizarTema(indiceTemaAtual);
        });
    }

    container.appendChild(grupoBotoes);
}

renderizarTema(indiceTemaAtual);