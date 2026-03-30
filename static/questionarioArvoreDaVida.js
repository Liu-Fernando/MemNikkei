
//AVISAR EM ALGUMA TELA ANTERIOR QUANTAS PERGUNTAS TÊM O FORMULÁRIO E COMO VAI FUNCIONAR

//o questionário é um objeto divido em "blocos". Cada bloco é um tema (raízes, solo/terra, tronco etc). Cada bloco desse tem um título, texto explicativo sobre o que é aquele bloco e um array de perguntas

const questionario = {
    raizes: {
        titulo: "Raízes (Origem e Herança)", 
        textoExplicativo: "As raízes representam de onde a pessoa veio, sua história familiar, ancestralidade e as pessoas que a influenciaram.", 
        perguntas: [
                "1) De onde você veio? Qual é a sua cidade natal, ou a região do Brasil que te formou?",
                "2) Quem foram as pessoas mais importantes na sua infância e juventude (avós, pais, tios, mestres)?", 
                "3) Quais foram os momentos ou memórias mais marcantes da sua história de vida que te trouxeram até aqui?", 
                "4) Quais valores ou 'sementes' importantes você herdou da sua família ou da sua comunidade, que você carrega até hoje?"
        ]
    },
    soloTerra: {
        titulo: "Solo/Terra (Atividades Diárias e Cotidiano)",
        perguntas: [
                "5) O que você gosta de fazer no seu dia a dia que te traz alegria ou satisfação?", "6) Quais são as suas rotinas semanais que te dão estrutura e a sensação de pertencimento?", 
                "7) Com quem você interage mais frequentemente (vizinhos, amigos, família, grupos sociais)?"
        ]
    },
    tronco: {
        titulo: "Tronco (Habilidades e Valores Centrais)", 
        textoExplicativo: "O tronco é o que sustenta a árvore, representando as habilidades, conhecimentos e valores que a pessoa desenvolveu ao longo da vida.",
        perguntas: [
                "8) Quais são as suas maiores habilidades ou talentos que você aprimorou com o tempo?", 
                "9) Quais são os seus valores inegociáveis, aqueles que guiam suas ações e decisões?", 
                "10) Que tipo de pessoa você se orgulha de ser?"
        ]
    },
    galhos: {
        titulo: "Galhos (Esperanças e Sonhos para o Futuro)", 
        textoExplicativo: "Os galhos se estendem para o céu, representando os desejos, esperanças e sonhos de curto e longo prazo.", 
        perguntas: [
            "11) Quais são seus sonhos ou desejos para o futuro próximo? O que você ainda gostaria de fazer ou experimentar?", 
            "12) O que você espera para sua família, netos ou comunidade nos próximos anos?", 
            "13) Que tipo de 'fruto' você ainda quer colher na sua vida?"
        ] 
    },
    folhas: {
        titulo: "Folhas (Pessoas Especiais e Contribuições)", 
        textoExplicativo: "As folhas representam as pessoas importantes na vida ('as pessoas que te dão vida') e as contribuições que você faz para a vida dos outros.", 
        perguntas: [
            "14) Quem são as pessoas especiais na sua vida hoje (vivos ou em memória) que te nutrem e te apoiam?",
            "15) De que forma você acha que contribui para a vida dessas pessoas ou da sua comunidade?",
            "16) O que você gostaria que as pessoas se lembrassem sobre você no futuro?"
        ] 
    },
    frutos: {
        titulo: "Frutos (Realizações e Legado)", 
        textoExplicativo: "Os frutos são as conquistas e o legado que a pessoa deixa para o mundo.", 
        perguntas: [
            "17) Quais são suas maiores conquistas ou 'frutos' dos quais você se orgulha?",
            "18) Qual a principal mensagem ou aprendizado que você gostaria de passar para as gerações mais jovens?",
        ] 
    }
}

const container = document.getElementById('container');
const arrayTemas = ["raizes", "soloTerra", "tronco", "galhos", "folhas", "frutos"]; //defini o array porque já sei os temas de cada pergunta (não mudam)
let indiceTemaAtual = 0; //vou ir percorrendo o array com essa var


//essa é uma função para fazer o tema aparecer na tela da pessoa sem eu ter que criar várias páginas para isso
function renderizarTema(index){

    const tema = arrayTemas[index];
    const configuracao = questionario[tema];

    container.innerHTML = ''; //serve para limpar o hrml, aparentemente

    //depois vem as coisinhas pra configurar na tela do html
}