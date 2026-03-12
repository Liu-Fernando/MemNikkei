const paginasComidasEReceitas = {
    sushi: {
        comida: [
            {
                nome: "Receita básica - Sushi (Makizushi simples)",
                foto: "/static/makizushi.jpg",
                descricaoImagem: "imagem de um prato com algumas peças de sushi ",
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
                ],
                sobreAComida: "O sushi simboliza delicadeza, técnica e respeito ao ingrediente. No Brasil, tornou-se um dos principais marcos da presença nikkei.",
                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Quem fazia sushi na sua família?",
                    "Era preparado em datas especiais?",
                    "Você ajudava a enrolar?"
                ]
            }
        ]
    },
    missoshiru: {
        comida: [
            {
                nome: "Receita básica - Missoshiru",
                foto: "/static/makizushi.jpg", //MUDAR ISSO AQUI
                descricaoImagem: "", //MUDAR ISSO AQUI
                textoIngredientes: "Ingredientes",
                ingredientes: [
                    "1 litro de água",
                    "1 colher (sopa) de hondashi (caldo de peixe)",
                    "2 colheres (sopa) de missô",
                    "Cubos de tofu",
                    "Cebolinha picada"
                ],
                textoModoDePreparo: "Modo de preparo:",
                modoDePreparo: [
                    "Ferva a água com hondashi.",
                    "Dissolva o missô em um pouco do caldo.",
                    "Retorne à panela sem deixar ferver.",
                    "Acrescente tofu e finalize com cebolinha"
                ],
                sobreAComida: "O missoshiru aquecia os dias frios e era presença constante na mesa das famílias japonesas. Simples e nutritivo, representa cuidado e rotina.",
                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Quem preparava esse prato na sua casa?",
                    "Você ajudava na cozinha?",
                    "Em quais ocasiões ele era servido?"
                ]
            }
        ]
    },
    kare: {
        comida: [
            {
                nome: "Receita básica - Karê",
                foto: "/static/makizushi.jpg", //MUDAR ISSO AQUI
                descricaoImagem: "", //MUDAR ISSO AQUI
                textoIngredientes: "Ingredientes",
                ingredientes: [
                    "500g de carne em cubos",
                    "2 batatas",
                    "1 cenoura",
                    "1 cebola",
                    "1 tablete de curry japonês",
                    "3 xícaras de água"
                ],
                textoModoDePreparo: "Modo de preparo:",
                modoDePreparo: [
                    "Refogue carne e cebola.",
                    "Acrescente legumes e água.",
                    "Cozinhe até amolecer.",
                    "Adicione o tablete de curry e mexa até engrossar.",
                    "Sirva com gohan."

                ],
                sobreAComida: "Curry japonês adaptado da culinária britânica, tornou-se prato caseiro popular.",
                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Quem preparava esse prato na sua casa?",
                    "Você ajudava na cozinha?",
                    "Em quais ocasiões ele era servido?"

                ]
            }
        ]
    },
    onigiri: {
        comida: [
            {
                nome: "Receita básica - Onigiri",
                foto: "/static/makizushi.jpg", //MUDAR ISSO AQUI
                descricaoImagem: "", //MUDAR ISSO AQUI
                textoIngredientes: "Ingredientes",
                ingredientes: [
                    "Arroz japonês cozido",
                    "Sal",
                    "Recheio (atum, umeboshi, salmão)",
                    "Nori"
                ],
                textoModoDePreparo: "Modo de preparo:",
                modoDePreparo: [
                    "Molhe as mãos com água e sal.",
                    "Modele o arroz em formato triangular.",
                    "Coloque o recheio no centro.",
                    "Envolva parcialmente com nori."
                ],
                sobreAComida: "Muito presente nos bentôs escolares e viagens.",
                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Quem preparava esse prato na sua casa?",
                    "Você ajudava na cozinha?",
                    "Em quais ocasiões ele era servido?"
                ]
            }
        ]
    },
    gohan: {
        comida: [
            {
                nome: "Receita básica - Gohan",
                foto: "/static/makizushi.jpg", //MUDAR ISSO AQUI
                descricaoImagem: "", //MUDAR ISSO AQUI
                textoIngredientes: "Ingredientes",
                ingredientes: [
                    "2 xícaras de arroz japonês",
                    "2 ½ xícaras de água"
                ],
                textoModoDePreparo: "Modo de preparo:",
                modoDePreparo: [
                    "Lave bem o arroz.",
                    "Deixe descansar 15 minutos na água.",
                    "Cozinhe até secar.",
                    "Descanse 10 minutos antes de servir."
                ],
                sobreAComida: "Base da alimentação japonesa. Representa sustento e simplicidade.",
                textoRecordarMemorias: "Para recordar memórias",
                perguntas: [
                    "Quem preparava esse prato na sua casa?",
                    "Você ajudava na cozinha?",
                    "Em quais ocasiões ele era servido?"
                ]
            }
        ]
    }
}

const container = document.getElementById('container'); //pega a div do html que tem container
const configuracao = paginasComidasEReceitas[paginaAtual];//pega a config da página atual. Se a página atual 

if (configuracao && configuracao.comida) { //verifica se a página existe e se tem as comidas
    configuracao.comida.forEach(comida => { //para cada caixinha no array lá em cima, vai fazer executar isso aqui:

        const paragrafoNomeComida = document.createElement('p');
        paragrafoNomeComida.className = 'nomeComida';
        paragrafoNomeComida.textContent = comida.nome;

        const img = document.createElement('img');
        img.className = 'imagemComida'
        img.src = comida.foto;
        img.alt = comida.descricaoImagem;

        const textoIngredientes = document.createElement('p');
        textoIngredientes.className = 'textoIngredientes'
        textoIngredientes.textContent = comida.textoIngredientes;

        const ul = document.createElement('ul');
        comida.ingredientes.forEach(item => {
            const itemLista = document.createElement('li');
            itemLista.textContent = item;
            ul.appendChild(itemLista);
        });

        const textoModoDePreparo = document.createElement('p');
        textoModoDePreparo.className = 'textoModoDePreparo'
        textoModoDePreparo.textContent = comida.textoModoDePreparo;

        const ol = document.createElement('ol');
        comida.modoDePreparo.forEach(item => {
            const itemLista = document.createElement('li');
            itemLista.textContent = item;
            ol.appendChild(itemLista);
        });

        const sobreAComida = document.createElement('p');
        sobreAComida.className = 'sobreAComida';
        sobreAComida.textContent = comida.sobreAComida;

        const textoRecordarMemorias = document.createElement('p');
        textoRecordarMemorias.className = 'textoRecordarMemorias'
        textoRecordarMemorias.textContent = comida.textoRecordarMemorias;

        const ul2 = document.createElement('ul');
        comida.perguntas.forEach(item => {
            const itemLista = document.createElement('li');
            itemLista.textContent = item;
            ul2.appendChild(itemLista);
        });

        container.appendChild(paragrafoNomeComida);
        container.appendChild(img);
        container.appendChild(textoIngredientes);
        container.appendChild(ul);
        container.appendChild(textoModoDePreparo);
        container.appendChild(ol);
        container.appendChild(sobreAComida);
        container.appendChild(textoRecordarMemorias);
        container.appendChild(ul2);
    }
    )
}