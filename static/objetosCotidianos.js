const paginaExplorarObjetos = {
    casaEFamilia: {
        tipoObjeto: [
            {
                nome: "Casa e Família",

                texto: "Na casa nikkei, cada objeto tinha função e significado. \n O futon era guardado todas as manhãs. \n O chá era servido com cuidado. \n Os hashis ensinavam disciplina desde cedo.",

                arrayDeFotos: [
                    {tipo: "foto", src: "/static/chochin.jpg", alt: "Uma lanterna de papel japonesa branca (chochin) de formato cilíndrico pendurada em frente a uma folhagem densa e verde. A lanterna possui caracteres japoneses pretos pintados em sua superfície."},
                    {tipo: "nomeObjeto", conteudo: "Chochin (lanterna japonesa)"},

                    {tipo: "foto", src: "/static/futon.webp", alt: "Interior de um quarto tradicional japonês com dois futons brancos estendidos sobre o chão de tatame. O ambiente possui paredes brancas, detalhes em madeira clara, uma janela shoji de papel translúcido e um pergaminho azul pendurado na parede."},
                    {tipo: "nomeObjeto", conteudo: "Futon"},

                    {tipo: "foto", src: "/static/tatame.jpeg", alt: "Ampla visão de um cômodo tradicional japonês (washitsu) com o chão totalmente coberto por placas de tatame. A estrutura da casa é de madeira escura com divisórias de papel shoji. Pequenas placas de madeira com inscrições estão posicionadas sobre o tatame."},
                    {tipo: "nomeObjeto", conteudo: "Tatame"},

                    {tipo: "foto", src: "/static/hashi.jpg", alt: "Oito pares de hashi (pauzinhos) de diferentes materiais e designs alinhados diagonalmente sobre um fundo branco. Os estilos variam entre madeira natural, bambu, metal e cerâmica decorada com padrões florais e caracteres japoneses."},
                    {tipo: "nomeObjeto", conteudo: "Hashi"},

                    {tipo: "foto", src: "/static/chawan.jpeg", alt: "Uma tigela de chá de cerâmica branca decorada com desenhos de leques japoneses coloridos. Ao lado, um batedor de bambu (chasen) para o preparo de matcha. O cenário é composto por panos de mesa em tons de rosa e roxo com um bule ao fundo."},
                    {tipo: "nomeObjeto", conteudo: "Chawan"},

                    {tipo: "foto", src: "/static/buleDeCha.jpeg", alt: "Close-up de um bule de ferro fundido preto (tetsubin) e uma xícara de cerâmica soltando vapor. À frente, uma pequena tigela de metal contém ervas secas e frutas para infusão. O fundo apresenta luzes douradas circulares desfocadas (bokeh), criando um clima aconchegante."},
                    {tipo: "nomeObjeto", conteudo: "Bule de chá"},

                    {tipo: "foto", src: "/static/caixaDeBento.jpeg", alt: "Vista superior de uma caixa de bento de madeira clara sobre uma mesa. Contém uma porção de arroz branco com uma ameixa em conserva (ume boshi), camarões empanados (tempura), tonkatsu, salada de repolho e conserva de nabo. À frente, um par de hashi em um envelope de papel com logomarca japonesa."},
                    {tipo: "nomeObjeto", conteudo: "Caixa de bentô"}
                ],

                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Sua casa tinha tatame?",
                    "Vocês dormiam em futon ou cama?",
                    "Como era o ritual do chá?",
                    "Você lembra do barulho dos hashis batendo na tigela?"
                ]
            }
        ]
    },
    objetosDeTrabalho: {
        tipoObjeto: [
            {
                nome: "Objetos de Trabalho",

                texto: "Muitas famílias nikkeis iniciaram a vida no Brasil na agricultura. \n O trabalho era silencioso e disciplinado. A terra era cultivada com respeito. As ferramentas eram guardadas com cuidado como extensão das mãos.",

                arrayDeFotos: [
                    {tipo: "foto", src: "/static/familiaFazendeira.png", alt: "era pra ser um chochin"},
                    {tipo: "nomeObjeto", conteudo: "Família japonesa imigrante (arquivo do Museu Histórico da Imigração Japonesa no Brasil"},

                    {tipo: "foto", src: "/static/familiaJaponesa.jpg", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Família de imigrantes japoneses que começaram a produzir algodão, tendo sido proibidos de plantar café, por volta de 1930 (Arquivo do Museu Histórico da Imigração Japonesa no Brasil)"},

                    {tipo: "foto", src: "/static/imigrantesJaponeses.png", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Colônia de Itaquera (arquivo Museu da Pessoa)."}
                ],

                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Você ajudava na plantação?",
                    "Qual era sua tarefa?",
                    "Lembra do cheiro da terra molhada?"
                ]
            }
        ]
    },
    espiritualidadeETradicao: {
        tipoObjeto: [
            {
                nome: "Espiritualidade e Tradição",

                texto: "Em muitas casas nikkeis, a espiritualidade fazia parte do cotidiano. \n Ela estava no silêncio da manhã, no gesto de acender o incenso, na fotografia cuidadosamente guardada. \n Não era apenas religião. \n Era respeito aos antepassados. \n Era memória viva. \n Era continuidade. \n Mesmo longe do Japão, esses objetos atravessaram o oceano ou foram recriados aqui, mantendo acesa a ligação entre gerações. \nCada casa tinha sua forma própria de expressar fé, gratidão e pertencimento. \n Que lembranças esses objetos despertam em você?",

                arrayDeFotos: [
                    {tipo: "foto", src: "/static/santuario.jpg", alt: "era pra ser um chochin"},
                    {tipo: "nomeObjeto", conteudo: "Santuários Japoneses – Butsudan e Kamidana (fonte: Jpão em foco"},

                    {tipo: "foto", src: "/static/incenso.webp", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Incenso Tamamoko (fonte: aflui)"},

                    {tipo: "foto", src: "/static/omamori.jpeg", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Omamori e ofuda"},

                    {tipo: "foto", src: "/static/kamidana.jpg", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Kamidana - Santuário xintoísta suspenso"}
                ],

                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Você lembra do cheiro do incenso?",
                    "Havia butsudan na sua casa?",
                    "Você já recebeu um omamori?"
                ]
            }
        ]
    },
    escolaEEducacao: {
        tipoObjeto: [
            {
                nome: "Escola e Educação",

                texto: "A educação sempre ocupou um lugar central nas famílias nikkeis. \n Entre o Japão e o Brasil, muitos cresceram aprendendo duas línguas, dois alfabetos e duas formas de ver o mundo. \n Havia disciplina, esforço e dedicação. \n Havia também orgulho — e, às vezes, o desafio de se sentir diferente. \n Cadernos, livros, uniformes e mochilas guardam histórias de perseverança e sonhos. \n O estudo não era apenas obrigação. \n Era caminho para o futuro. \n Que lembranças da escola vivem em você? ",

                arrayDeFotos: [
                    {tipo: "foto", src: "/static/materialShodo.jpg", alt: "era pra ser um chochin"},
                    {tipo: "nomeObjeto", conteudo: "Material Shodô (fonte: Totenart)"},

                    {tipo: "foto", src: "/static/furoshiki.webp", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Furoshiki (fonte: O Celeiro)"},

                    {tipo: "foto", src: "/static/escolaJaponesa.jpg", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "2ª Escola Primária Taisho (fonte: Descubra Nikkei)"},
                ],

                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Você usou kimono em festivais?",
                    "Lembra do som da geta?",
                    "Quem guardava essas roupas especiais?"
                ]
            }
        ]
    },
    vestimentasETecidos: {
        tipoObjeto: [
            {
                nome: "Vestimentas e Tecidos",

                texto: "As roupas também contam histórias. \n Algumas vieram dobradas com cuidado dentro das malas de imigração. \n Outras foram costuradas já no Brasil, adaptadas ao clima, ao trabalho e à nova vida. \n Vestir-se era mais do que proteção ou estética. \n Era identidade. \n Era tradição. \n Era respeito às ocasiões especiais. \n O som da madeira da geta no chão. \n O peso delicado de um kimono. \n O avental usado na cozinha. \n Que lembranças as vestimentas despertam em você?",

                arrayDeFotos: [
                    {tipo: "foto", src: "/static/geta.jpeg", alt: "era pra ser um chochin"},
                    {tipo: "nomeObjeto", conteudo: "Geta"},

                    {tipo: "foto", src: "/static/kimono.jpg", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Kimono"},

                    {tipo: "foto", src: "/static/happiHanten.webp", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Happi & Hanten (fonte: Taiko Shop)"},

                    {tipo: "foto", src: "/static/haragake.jpeg", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Haragake (fonte: Taiko Shop)"},

                    {tipo: "foto", src: "/static/tabi.jpeg", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Tabi (sapatos/botas)"},

                    {tipo: "foto", src: "/static/setta.jpeg", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Zouri & Setta (sandálias)"},

                    {tipo: "foto", src: "/static/tekkou.webp", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Tekkou - pulseira (fonte: Taiko Shop )"},

                    {tipo: "foto", src: "/static/pressagio.webp", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Presságio - máscara (fonte: Taiko Shop )"},

                    {tipo: "foto", src: "/static/kasa.webp", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Kasa - chapéu (fonte: Taiko Shop )"},

                    {tipo: "foto", src: "/static/hachimaki.webp", alt: "era pra ser um futon"},
                    {tipo: "nomeObjeto", conteudo: "Hachimaki - bandana (fonte: Taiko Shop )"}
                ],

                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Você estudou japonês?",
                    "Tinha vergonha ou orgulho?",
                    "Quem ajudava nas lições?"
                ]
            }
        ]
    }
}

const container = document.getElementById('container'); //pega a div do html que tem container
const configuracao = paginaExplorarObjetos[paginaAtual];//pega a config da página atual. Se a página atual 

if (configuracao && configuracao.tipoObjeto) { 
    configuracao.tipoObjeto.forEach(tipoObjeto => { 

        const paragrafoNometipoObjeto = document.createElement('p');
        paragrafoNometipoObjeto.className = 'nometipoObjeto';
        paragrafoNometipoObjeto.textContent = tipoObjeto.nome;
        container.appendChild(paragrafoNometipoObjeto);

        const texto = document.createElement('p');
        texto.className = 'texto'
        texto.textContent = tipoObjeto.texto;
        container.appendChild(texto);

        tipoObjeto.arrayDeFotos.forEach(item => {
            if (item.tipo === "foto") {
                const img = document.createElement('img');
                img.className = 'imagemtipoObjeto';
                img.src = item.src;
                img.alt = item.alt;
                container.appendChild(img);

            } else if (item.tipo === "nomeObjeto") {
                const p = document.createElement('p');
                p.className = 'nomeObjeto';
                p.textContent = item.conteudo;
                container.appendChild(p);
            }
        });

        const div = document.createElement('div');
        div.className = 'divBranca';
        
        const textoRecordarMemorias = document.createElement('p');
        textoRecordarMemorias.className = 'textoRecordarMemorias'
        textoRecordarMemorias.textContent = tipoObjeto.textoRecordarMemorias;
        div.appendChild(textoRecordarMemorias);

        const ul = document.createElement('ul');
        tipoObjeto.perguntas.forEach(item => {
            const itemLista = document.createElement('li');
            itemLista.textContent = item;
            ul.appendChild(itemLista);
        });
        div.appendChild(ul);
        container.appendChild(div);
    }
    )
}