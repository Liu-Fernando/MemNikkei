const paginasComidasEReceitas = {
    sushi: {
        comida: [
            {
                nome: "Receita básica - Sushi (Makizushi simples)",
                foto: "../../../static/makizushi.png",
                descricaoImagem: "alguma coisa",
                textoIngredientes: "Ingredientes",
                ingredientes: [
                    "2 xícaras de arroz japonês",
                    "2 ½ xícaras de água",
                    "4 colheres (sopa) de vinagre de arroz",
                    "2 colheres (sopa) de açúcar",
                    "1 colher (chá) de sal",
                    "Folhas de nori",
                    "Recheio: pepino, cenoura, peixe cru ou kani"
                ],
                textoModoDePreparo: "Modo de preparo:",
                modoDePreparo: [
                    "Lave o arroz até a água sair clara.",
                    "Cozinhe com a água até secar.",
                    "Misture vinagre, açúcar e sal e incorpore ao arroz ainda morno.",
                    "Sobre a alga nori, espalhe o arroz.",
                    "Adicione o recheio.",
                    "Enrole com auxílio da esteira e corte em fatias."
                ]
            }
        ]
    }
}

const container = document.getElementById('container'); //pega a div do html que tem container
const configuracao = paginasComidasEReceitas[paginaAtual];//pega a config da página atual. Se a página atual 

if (configuracao && configuracao.comida) { //verifica se a página existe e se tem as caixinhas
    configuracao.comida.forEach(comida => { //para cada caixinha no array lá em cima, vai fazer executar isso aqui:

        const paragrafoNomeComida = document.createElement('p');
        paragrafoNomeComida.textContent = comida.nome;
        container.appendChild(paragrafoNomeComida);

        const divImagem = document.createElement('div');
        divImagem.className = 'imagemReceita';
        const img = document.createElement('img');
        img.src = comida.foto;
        img.alt = comida.descricaoImagem;
        container.appendChild(divImagem);

        const textoIngredientes = document.createElement('p');
        textoIngredientes.textContent = comida.textoIngredientes;
        container.appendChild(textoIngredientes);

        const ul = document.createElement('ul');
        comida.ingredientes.forEach(item => {
            const itemLista = document.createElement('li');
            itemLista.textContent = item;
            ul.appendChild(itemLista);
        });

        const textoModoDePreparo = document.createElement('p');
        textoModoDePreparo.textContent = comida.textoModoDePreparo;
        container.appendChild(textoModoDePreparo);

        const ul2 = document.createElement('ul');
        comida.modoDePreparo.forEach(item => {
            const itemLista = document.createElement('li');
            itemLista.textContent = item;
            ul2.appendChild(itemLista);
        });


        container.appendChild(paragrafoNomeComida);
        container.appendChild(divImagem);
        container.appendChild(textoIngredientes);
        container.appendChild(ul);
        container.appendChild(textoModoDePreparo);
        container.appendChild(ul2);
    }
    )
}