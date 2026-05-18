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

        botaoFinalizar.addEventListener('click', async () => {
            salvarRespostasAtuais(tema, configuracao);
            await enviarParaAnalise();
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

function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatarAnalise(texto) {
    const blocos = texto.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    return blocos.map(bloco => {
        const tituloSecao = bloco.match(/^\d+\.\s*\*\*(.+?)\*\*\s*:?\s*(.*)$/s);
        if (tituloSecao) {
            const titulo = escapeHtml(tituloSecao[1].trim());
            const resto = tituloSecao[2].trim();
            let html = `<h3 class="secaoIkigai">${titulo}</h3>`;
            if (resto) {
                const seguro = escapeHtml(resto).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
                html += `<p>${seguro.replace(/\n/g, "<br>")}</p>`;
            }
            return html;
        }
        const seguro = escapeHtml(bloco).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        return `<p>${seguro.replace(/\n/g, "<br>")}</p>`;
    }).join("");
}

async function enviarParaAnalise() {
    container.innerHTML = '<p class="carregandoIkigai">Analisando suas respostas... isso pode levar alguns segundos.</p>';
    try {
        const r = await fetch('/api/ikigai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ respostas })
        });
        const data = await r.json();
        if (!r.ok || !data.analise) {
            if (data.tipo === 'quota_esgotada') {
                container.innerHTML = `
                    <p class="tema">LIMITE DIÁRIO ATINGIDO</p>
                    <div class="avisoQuotaIkigai">
                        <p>${escapeHtml(data.erro)}</p>
                        <p>Suas respostas não foram perdidas — você pode voltar mais tarde e clicar em <strong>Tentar novamente</strong> para gerar a análise.</p>
                    </div>
                    <div class="grupoBotoes">
                        <button class="botaoProximo" id="btnTentar">Tentar novamente</button>
                    </div>`;
                document.getElementById('btnTentar').addEventListener('click', enviarParaAnalise);
                return;
            }
            container.innerHTML = `<p class="erroIkigai">${escapeHtml(data.erro || 'Erro ao gerar análise.')}</p>
                <button class="botaoProximo" id="btnTentar">Tentar novamente</button>`;
            document.getElementById('btnTentar').addEventListener('click', enviarParaAnalise);
            return;
        }
        renderizarAnalise(data.analise);
    } catch (e) {
        container.innerHTML = `<p class="erroIkigai">Erro de conexão. Verifique sua internet.</p>
            <button class="botaoProximo" id="btnTentar">Tentar novamente</button>`;
        document.getElementById('btnTentar').addEventListener('click', enviarParaAnalise);
    }
}

function renderizarAnalise(texto) {
    container.innerHTML = `
        <p class="tema">SEU IKIGAI</p>
        <div class="analiseIkigai">${formatarAnalise(texto)}</div>
        <div class="grupoBotoes">
            <button class="botaoVoltar" id="btnRefazer">Refazer</button>
        </div>
    `;
    document.getElementById('btnRefazer').addEventListener('click', () => {
        for (const t of arrayTemas) respostas[t] = {};
        indiceTemaAtual = 0;
        renderizarTema(indiceTemaAtual);
    });
}