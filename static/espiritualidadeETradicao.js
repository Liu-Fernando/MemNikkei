const paginaExplorarObjetos = {
    casaEFamilia: {
        tipoObjeto: [
            {
                nome: "Casa e Família",
                foto1: "/static/makizushi.jpg",
                descricaoImagem1: "imagem legal aqui",
                texto1: "O B",
                foto2: "/static/makizushi.jpg",
                descricaoImagem2: "imagem ",
                texto2: "As lanternas acesas, ",
                foto3: "/static/makizushi.jpg",
                descricaoImagem3: "imagem ",
                texto3: "É um momento de gratidão, alegria, reencontro e fortalecimento dos laços familiares e comunitários.",
                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Você se lembra da primeira vez que dançou Bon Odori?",
                    "Quem costumava dançar ao seu lado nas festas?",
                    "Qual som do festival mais marcou você?"
                ]
            }
        ]
    },
    tanabataMatsuri: {
        tipoObjeto: [
            {
                nome: "Tanabata Matsuri - Festival das Estrelas",
                foto1: "/static/makizushi.jpg",
                descricaoImagem1: "imagem legal aqui",
                texto1: "O Tanabata Matsuri, conhecido como Festival das Estrelas, é uma celebração tradicional japonesa realizada no sétimo dia do sétimo mês. A data é inspirada em uma antiga lenda que conta a história de dois amantes representados pelas estrelas Orihime e Hikoboshi, que vivem separados pela Via Láctea e só podem se encontrar uma vez por ano. \n Durante o festival, as pessoas escrevem seus desejos em tiras coloridas de papel chamadas tanzaku e as penduram em ramos de bambu. As ruas e associações culturais são decoradas com enfeites vibrantes, criando um ambiente alegre e cheio de esperança.",
                foto2: "/static/makizushi.jpg",
                descricaoImagem2: "imagem ",
                texto2: "O Tanabata simboliza sonhos, perseverança e a importância de manter viva a esperança ao longo da vida. \n No Brasil, especialmente em comunidades nipo-brasileiras, o festival tornou-se também um momento de encontro cultural, com apresentações, comidas típicas e celebração das tradições japonesas.",
                foto3: "/static/makizushi.jpg",
                descricaoImagem3: "imagem ",
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
const configuracao = paginaExplorarObjetos[paginaAtual];//pega a config da página atual. Se a página atual 

if (configuracao && configuracao.tipoObjeto) { 
    configuracao.tipoObjeto.forEach(tipoObjeto => { 

        const paragrafoNometipoObjeto = document.createElement('p');
        paragrafoNometipoObjeto.className = 'nometipoObjeto';
        paragrafoNometipoObjeto.textContent = tipoObjeto.nome;

        const img1 = document.createElement('img');
        img1.className = 'imagemtipoObjeto'
        img1.src = tipoObjeto.foto1;
        img1.alt = tipoObjeto.descricaoImagem1;

        const texto1 = document.createElement('p');
        texto1.className = 'texto'
        texto1.textContent = tipoObjeto.texto1;

        const img2 = document.createElement('img');
        img2.className = 'imagemtipoObjeto'
        img2.src = tipoObjeto.foto2;
        img2.alt = tipoObjeto.descricaoImagem2;

        const texto2 = document.createElement('p');
        texto2.className = 'texto'
        texto2.textContent = tipoObjeto.texto2;

        const img3 = document.createElement('img');
        img3.className = 'imagemtipoObjeto'
        img3.src = tipoObjeto.foto3;
        img3.alt = tipoObjeto.descricaoImagem3;

        const texto3 = document.createElement('p');
        texto3.className = 'texto'
        texto3.textContent = tipoObjeto.texto3;

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

        container.appendChild(paragrafoNometipoObjeto);
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