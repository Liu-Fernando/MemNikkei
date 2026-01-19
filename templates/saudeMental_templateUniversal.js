const paginasSaudeMental = {
    solidao: {
        caixinhas: [
            { 
                cor: '#7c83a3',
                texto: 'um texto sobre solidão para ver como fica',
                //imagem: caminho da imagem
                resumo: 'um resumo do vídeo para ver como fica',
                creditos: 'creditos: para ver como fica'
            }
        ]
    }
};

//config página
const container = document.getElementById('container');
const config = paginasSaudeMental[paginaAtual];

if (config && config.caixinhas) {
    config.caixinhas.forEach(caixinha => {
    //cria div da caixa
        const divCaixa = document.createElement('div');
        divCaixa.className = 'caixa';
        divCaixa.style.backgroundColor = caixinha.cor;

        //cria a thumbnail
        const divThumbnail = document.createElement('div');
        divThumbnail.className = 'thumbnail';
        const img = document.createElement('img');
        img.src = caixinha.imagem;
        img.alt = caixinha.texto;
        divThumbnail.appendChild(img);

        //cria o texto
        const divTexto = document.createElement('div');
        divTexto.className = 'texto';
        const p = document.createElement('p');
        p.textContent = caixinha.texto;
        divTexto.appendChild(p);

        //thumbnail e texto na caixa
        divCaixa.appendChild(divThumbnail);
        divCaixa.appendChild(divTexto);

        // Adiciona a caixa ao container
        container.appendChild(divCaixa);

        //cria o resumo
        const divResumo = document.createElement('div');
        divResumo.className = 'resumoVideo';
        const pResumo = document.createElement('p');
        pResumo.textContent = caixinha.resumo;
        divResumo.appendChild(pResumo);
        container.appendChild(divResumo);

        //cria os créditos
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