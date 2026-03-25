const enviar = document.getElementById('enviarMemoria');     //Botão de Enviar de minhasMemorias_adicionarMemorias.html
const lista = document.getElementById('listaDeMemorias');

//Garante que a página carregou antes de tentar rodar script
window.addEventListener("DOMContentLoaded", (event) => {
  //Mantem JS separado do HTML
  enviar.addEventListener("click", fetchMemorias);
});

async function fetchMemorias() {
  const data = await fetch('/minhasMemorias/adicionarMemoria/listaDeMemorias',{method:'GET'});
  const memorias = await data.json();

  memorias.forEach(memoria => {
    const table = document.createElement('Table');  
    table.innerHTML = `
        <tr>
            <th>Id </th>
            <th>Título </th>
            <th>Data </th>
            <th>Local </th>
            <th>Descrição </th>
            <th>Arquivo </th>
        </tr>
        <tr>
            <td>${memoria.id} </td>
            <td>${memoria.titulo} </td>
            <td>${memoria.data} </td>
            <td>${memoria.local} </td>
            <td>${memoria.descricao} </td>
            <td>${memoria.arquivo} </td>
        </tr>
    
    `;
    lista.appendChild(table);
    
  }
  )
  const form =''
  await fetch('/minhasMemorias/adicionarMemoria/listaDeMemorias',
    {method:'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(form)
    
  });
}

async function addMemoria() {
  
}