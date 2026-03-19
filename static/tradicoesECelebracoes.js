const paginaTradicoesECelebracoes = {
    bonOdori: {
        tradicao: [
            {
                nome: "Bon Odori — Dança e Memória dos Ancestrais",
                foto1: "/static/makizushi.jpg",
                descricaoImagem1: "imagem ",
                texto1: "O Bon Odori é um festival tradicional japonês realizado no verão, entre julho e agosto, como parte das celebrações do Obon, período dedicado à homenagem aos ancestrais. Segundo a tradição, é um momento em que os espíritos dos antepassados retornam simbolicamente para visitar suas famílias. \n A principal característica do festival é a dança circular chamada odori, cujos movimentos são simples, repetitivos e fáceis de aprender. Muitos passos representam atividades do cotidiano antigo, como pesca, plantio e colheita, conectando a dança às raízes rurais da cultura japonesa.",
                foto2: "/static/makizushi.jpg",
                descricaoImagem2: "imagem ",
                texto2: "As lanternas acesas, simbolicamente, guiam os espíritos, criando uma atmosfera acolhedora, mística e comunitária. \n No Brasil, o Bon Odori tornou-se uma importante celebração da cultura nipo-brasileira. Além das danças, os festivais costumam incluir apresentações de taiko (tambores japoneses), barracas com comidas típicas, karaokê e outras manifestações culturais. ",
                foto3: "/static/makizushi.jpg",
                descricaoImagem3: "imagem ",
                texto3: "É um momento de gratidão, alegria, reencontro e fortalecimento dos laços familiares e comunitários.",
                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Você se lembra da primeira vez que dançou Bon Odori?",
                    "Quem costumava dançar ao seu lado nas festas?",
                    "Qual som do festival mais marcou você?",
                    "Você usava alguma roupa especial para essa ocasião?",
                    "Como você se sentia ao ver as lanternas iluminando a noite?"
                ]
            }
        ]
    },
    tanabataMatsuri: {
        tradicao: [
            {
                nome: "Receita básica - Sushi (Makizushi simples)",
                foto1: "/static/makizushi.jpg",
                descricaoImagem1: "imagem ",
                texto1: "Ingredientes",
                foto2: "Modo",
                descricaoImagem2: "imagem ",
                texto2: "",
                foto3: "",
                descricaoImagem3: "imagem ",
                texto3: "",
                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Quem fazia sushi na sua família?",
                    "Era preparado em datas especiais?",
                    "Você ajudava a enrolar?"
                ]
            }
        ]
    }
}

const container = document.getElementById('container'); //pega a div do html que tem container
const configuracao = paginaTradicoesECelebracoes[paginaAtual];//pega a config da página atual. Se a página atual 

if (configuracao && configuracao.tradicao) { 
    configuracao.tradicao.forEach(tradicao => { 

        const paragrafoNomeTradicao = document.createElement('p');
        paragrafoNomeTradicao.className = 'nomeTradicao';
        paragrafoNomeTradicao.textContent = tradicao.nome;

        const img1 = document.createElement('img');
        img1.className = 'imagemTradicao'
        img1.src = tradicao.foto;
        img1.alt = tradicao.descricaoImagem1;

        const texto1 = document.createElement('p');
        texto1.className = 'texto'
        texto1.textContent = tradicao.texto1;

        const img2 = document.createElement('img');
        img2.className = 'imagemTradicao'
        img2.src = tradicao.foto;
        img2.alt = tradicao.descricaoImagem2;

        const texto2 = document.createElement('p');
        texto2.className = 'texto'
        texto2.textContent = tradicao.texto2;

        const img3 = document.createElement('img');
        img3.className = 'imagemTradicao'
        img3.src = tradicao.foto;
        img3.alt = tradicao.descricaoImagem3;

        const texto3 = document.createElement('p');
        texto3.className = 'texto'
        texto3.textContent = tradicao.texto3;

        const div = document.createElement('div');
        div.className = 'divBranca';
        
        const textoRecordarMemorias = document.createElement('p');
        textoRecordarMemorias.className = 'textoRecordarMemorias'
        textoRecordarMemorias.textContent = tradicao.textoRecordarMemorias;
        div.appendChild(textoRecordarMemorias);

        const ul = document.createElement('ul');
        tradicao.perguntas.forEach(item => {
            const itemLista = document.createElement('li');
            itemLista.textContent = item;
            ul.appendChild(itemLista);
        });
        div.appendChild(ul);

        container.appendChild(paragrafoNomeTradicao);
        container.appendChild(img1);
        container.appendChild(texto1);
        container.appendChild(img2);
        container.appendChild(texto2);
        container.appendChild(img3);
        container.appendChild(texto3);
        container.appendChild(div);
    }
    )
}