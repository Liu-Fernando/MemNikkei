const paginaTradicoesECelebracoes = {
    bonOdori: {
        tradicao: [
            {
                nome: "Bon Odori — Dança e Memória dos Ancestrais",
                foto1: "/static/bonOdori1.jpg",
                descricaoImagem1: "Fotografia noturna de um festival Bon Odori em uma praça urbana. Centenas de lanternas de papel japonesas (chochin) brancas e laranjas estão penduradas em fileiras, iluminando a multidão. Ao fundo, um palco elevado decorado com faixas vermelhas e brancas centraliza o evento. Pessoas circulam pelo pátio de terra batida sob o brilho quente das luzes.",
                texto1: "O Bon Odori é um festival tradicional japonês realizado no verão, entre julho e agosto, como parte das celebrações do Obon, período dedicado à homenagem aos ancestrais. Segundo a tradição, é um momento em que os espíritos dos antepassados retornam simbolicamente para visitar suas famílias. \n A principal característica do festival é a dança circular chamada odori, cujos movimentos são simples, repetitivos e fáceis de aprender. Muitos passos representam atividades do cotidiano antigo, como pesca, plantio e colheita, conectando a dança às raízes rurais da cultura japonesa.",

                foto2: "/static/bonOdori2.jpg",
                descricaoImagem2: "Grupo de mulheres vestindo yukatas brancas com detalhes azuis dançando de forma sincronizada em um festival noturno. Elas estão em um pátio aberto sob cordões de lanternas laranjas brilhantes que cruzam o céu ao entardecer. A pose das dançarinas mostra braços estendidos em um movimento tradicional de Bon Odori. No canto inferior direito, um carimbo de data marca 2012.08.04.",
                texto2: "As lanternas acesas, simbolicamente, guiam os espíritos, criando uma atmosfera acolhedora, mística e comunitária. \n No Brasil, o Bon Odori tornou-se uma importante celebração da cultura nipo-brasileira. Além das danças, os festivais costumam incluir apresentações de taiko (tambores japoneses), barracas com comidas típicas, karaokê e outras manifestações culturais. ",

                foto3: "/static/bonOdori3.jpg",
                descricaoImagem3: "Quatro percussionistas de costas para a câmera tocam grandes tambores Taiko durante uma apresentação ao ar livre durante o dia. Eles vestem happi (casacos tradicionais) azul-marinho com um kanji vermelho nas costas e faixas amarelas na cintura. Uma grande plateia observa sentada e em pé ao redor do espaço de performance, com tendas brancas visíveis ao fundo sob a luz do sol",
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
                nome: "Tanabata Matsuri - Festival das Estrelas",
                foto1: "/static/tanabata1.jpeg",
                descricaoImagem1: "Ramos de bambu repletos de tanzaku (tiras de papel coloridas com desejos escritos) em um corredor ao ar livre. As tiras em cores vibrantes como laranja, rosa, azul e verde balançam ao sol. Ao fundo, pedestres caminham por uma calçada ensolarada e arborizada.",
                texto1: "O Tanabata Matsuri, conhecido como Festival das Estrelas, é uma celebração tradicional japonesa realizada no sétimo dia do sétimo mês. A data é inspirada em uma antiga lenda que conta a história de dois amantes representados pelas estrelas Orihime e Hikoboshi, que vivem separados pela Via Láctea e só podem se encontrar uma vez por ano. \n Durante o festival, as pessoas escrevem seus desejos em tiras coloridas de papel chamadas tanzaku e as penduram em ramos de bambu. As ruas e associações culturais são decoradas com enfeites vibrantes, criando um ambiente alegre e cheio de esperança.",

                foto2: "/static/tanabata2.jpeg",
                descricaoImagem2: "Uma criança pequena com corte de cabelo chanel está nos ombros de um adulto em meio a uma multidão. Ela segura um pequeno cata-vento colorido. Ao fundo, centenas de fitas decorativas longas e coloridas de um festival Tanabata criam um cenário desfocado e festivo.",
                texto2: "O Tanabata simboliza sonhos, perseverança e a importância de manter viva a esperança ao longo da vida. \n No Brasil, especialmente em comunidades nipo-brasileiras, o festival tornou-se também um momento de encontro cultural, com apresentações, comidas típicas e celebração das tradições japonesas.",

                foto3: "/static/tanabata3.jpeg",
                descricaoImagem3: "Close-up detalhado de tiras de papel tanzaku penduradas em galhos finos de bambu. As tiras, em tons pastéis de amarelo, azul e rosa, contêm mensagens escritas à mão. O fundo está suavemente desfocado, destacando a delicadeza das decorações típicas do festival das estrelas.",
                texto3: "Mais do que uma festa, o Tanabata é um convite para lembrar dos sonhos que tivemos, dos caminhos que percorremos e dos desejos que ainda guardamos no coração.",
                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Você se lembra de algum desejo especial que já escreveu?",
                    "Havia algum sonho que você tinha quando era jovem?",
                    "Quem costumava estar ao seu lado nessas celebrações?",
                    "Se pudesse fazer um desejo hoje, qual seria?"
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
        img1.src = tradicao.foto1;
        img1.alt = tradicao.descricaoImagem1;

        const texto1 = document.createElement('p');
        texto1.className = 'texto'
        texto1.textContent = tradicao.texto1;

        const img2 = document.createElement('img');
        img2.className = 'imagemTradicao'
        img2.src = tradicao.foto2;
        img2.alt = tradicao.descricaoImagem2;

        const texto2 = document.createElement('p');
        texto2.className = 'texto'
        texto2.textContent = tradicao.texto2;

        const img3 = document.createElement('img');
        img3.className = 'imagemTradicao'
        img3.src = tradicao.foto3;
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