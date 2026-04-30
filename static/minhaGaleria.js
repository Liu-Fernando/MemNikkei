const lista = document.getElementById('listaDeMemorias');

//Garante que a página carregou antes de tentar rodar script
window.addEventListener("DOMContentLoaded", (event) => {
    //Mantem JS separado do HTML
    window.addEventListener("load", fetchMemorias);

});



const container = document.getElementById('container');

async function fetchMemorias() {
    const data = await fetch('/minhasMemorias/adicionarMemoria/listaDeMemorias', { method: 'GET' });
    const memorias = await data.json();
    if (memorias) {
        memorias.forEach(memoria => {
            const divCaixa = document.createElement('div'); //cria um elemento div
            divCaixa.className = 'caixa'; //adiciona uma classe a essa div criada
            divCaixa.style.backgroundColor = '#7c83a3'; //bota uma cor na caixa (a cor definida no array)

            const divTitulo = document.createElement('div'); //cria um elemento texto para colocar o título do vídeo
            divTitulo.className = 'titulo'; //cria uma classe titulo
            const p = document.createElement('p'); //cria um elemento paragrafo (p)
            p.textContent = memoria.titulo; //o conteúdo textual em p recebe o titulo que tá em caixinha (array)
            divTitulo.appendChild(p); //coloca o paragrafo dentro da div titulo

            const divThumbnail = document.createElement('div'); //cria um elemento div
            divThumbnail.className = 'thumbnail'; //cria uma classe thumbnail 
            const img = document.createElement('img'); //cria um elemento imagem
            img.src = memoria.arquivo; //bota um caminho da imagem no elemento imagem (o link vai estar no array criado lá em cima)
            //img.alt = caixinha.textoDescritivoFoto; //coloca um texto que descreve a imagem da thumbnail (o texto vai estar no array criado lá em cima)
            divThumbnail.appendChild(img); //coloca a imagem dentro da div thumbnail

            divCaixa.appendChild(divTitulo); //coloca titulo dentro da caixa (tem que ser o 1°)
            divCaixa.appendChild(divThumbnail); //coloca thumbnail dentro da caixa

            //container.appendChild(linkVideo); //coloca o link dentro do container 
            container.appendChild(divCaixa);  //bpta a caixa no container (a caixa vai aparecer quando executar isso aqui)

            const divResumo = document.createElement('div'); //cria uma div para o resumo
            divResumo.className = 'resumoVideo'; //dá uma classe a essa div
            const pResumo = document.createElement('p'); //cria um elemento paragrafo 
            pResumo.textContent = memoria.descricao; //pega o conteudo textual que tá em caixinha.resumo e bota em pResumo.textContent
            divResumo.appendChild(pResumo); //coloca o parágrafo resumo dentro da div de resumo
            container.appendChild(divResumo); //coloca tudo no container (o texto vai aparecer quando executar isso aqui)

            const divCreditos = document.createElement('div');
            divCreditos.className = 'creditosVideo';
            const pCreditos = document.createElement('p');
            pCreditos.textContent = memoria.data;
            divCreditos.appendChild(pCreditos);
            container.appendChild(divCreditos);

            const divLocal = document.createElement('div');
            divLocal.className = 'creditosVideo';
            const pLocal = document.createElement('p');
            pLocal.textContent = memoria.local;
            divCreditos.appendChild(pLocal);
            container.appendChild(divLocal);

            const divDelete = document.createElement('div');
            divDelete.className='botaoDelete'
            const pDelete = document.createElement('button');
            pDelete.addEventListener("click", function(){
                deleteMemoria(memoria.id)
            });
            pDelete.textContent= 'Excluir';
            divDelete.appendChild(pDelete);
            container.appendChild(divDelete);

        }
        )

    }
    else {
        container.innerHTML = '<div class="loading">Página não encontrada</div>';
    }
}

async function  deleteMemoria(id) {
    if(!confirm("Excluir essa memória?")) return;
    await fetch(`/minhasMemorias/minhaGaleria/${id}`, { method: 'DELETE' });
    
}