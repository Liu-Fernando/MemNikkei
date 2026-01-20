const paginasSaudeMental = {
    solidao: {
        caixinhas: [
            { 
                cor: '#7c83a3',
                título: 'um texto sobre solidão para ver como fica',
                //imagem: caminho da imagem
                textoDescritivoFoto: 'um texto pra testar',
                resumo: 'um resumo do vídeo para ver como fica',
                creditos: 'creditos: para ver como fica'
            }
        ]
    }
};

//config página
const container = document.getElementById('container'); //pega a div do html que tem container
const config = paginasSaudeMental[paginaAtual]; //pega a config da página atual. Se a página atual é a de solidão, vai pegar o que tá nela

if (config && config.caixinhas) { //verifica se a página existe e se tem as caixinhas
    config.caixinhas.forEach(caixinha => { //para cada caixinha no array lá em cima, vai fazer executar isso aqui:
        const divCaixa = document.createElement('div'); //cria um elemento div
        divCaixa.className = 'caixa'; //adiciona uma classe a essa div criada
        divCaixa.style.backgroundColor = caixinha.cor; //bota uma cor na caixa (a cor definida no array)

        const divThumbnail = document.createElement('div'); //cria um elemento div
        divThumbnail.className = 'thumbnail'; //cria uma classe thumbnail 
        const img = document.createElement('img'); //cria um elemento imagem
        img.src = caixinha.imagem; //bota um caminho da imagem no elemento imagem (o link vai estar no array criado lá em cima)
        img.alt = caixinha.textoDescritivoFoto; //coloca um texto que descreve a imagem da thumbnail (o texto vai estar no array criado lá em cima)
        divThumbnail.appendChild(img); //coloca a imagem dentro da div thumbnail

        const divTitulo = document.createElement('div'); //cria um elemento texto para colocar o título do vídeo
        divTitulo.className = 'titulo'; //cria uma classe titulo
        const p = document.createElement('p'); //cria um elemento paragrafo (p)
        p.textContent = caixinha.titulo; //o conteúdo textual em p recebe o titulo que tá em caixinha (array)
        divTitulo.appendChild(p); //coloca o paragrafo dentro da div titulo

        divCaixa.appendChild(divThumbnail); //coloca thumbnail dentro da caixa
        divCaixa.appendChild(divTitulo); //coloca titulo dentro da caixa

        container.appendChild(divCaixa);  //bpta a caixa no container (a caixa vai aparecer quando executar isso aqui)

        const divResumo = document.createElement('div'); //cria uma div para o resumo
        divResumo.className = 'resumoVideo'; //dá uma classe a essa div
        const pResumo = document.createElement('p'); //cria um elemento paragrafo 
        pResumo.textContent = caixinha.resumo; //pega o conteudo textual que tá em caixinha.resumo e bota em pResumo.textContent
        divResumo.appendChild(pResumo); //coloca o parágrafo resumo dentro da div de resumo
        container.appendChild(divResumo); //coloca tudo no container (o texto vai aparecer quando executar isso aqui)

        const divCreditos = document.createElement('div');
        divCreditos.className = 'creditosVideo';
        const pCreditos = document.createElement('p');
        pCreditos.textContent = caixinha.creditos;
        divCreditos.appendChild(pCreditos);
        container.appendChild(divCreditos);
    });
} else {
    container.innerHTML = '<div class="loading">Página não encontrada</div>';
}