const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
<style>
    header {
        font-family: 'Noto Serif Japanese';
        background-color: #d52229;
        color: #ffffff;
        font-size: 10vw;
        width: 100%;
        
        
        
       
        display:flex;
        //TO-DO Alinhar
    }
    a{
    all: unset;
    font-family:Noto Serif Japanese' ;
    text-decoration: none;
    cursor: pointer;
    align-height:center;
    
    }
    .logoHeader{
    
    width:18vw;
    
    }

</style>
    <header>
    <img src="../static/MemLogo.png " class="logoHeader" alt="Logo"> 
        <a href="paginaInicial">Memórias Nikkei</a>
        
    </header>


`;


class Header extends HTMLElement{
    constructor(){
        super();
    }


    connectedCallback(){
        const shadowRoot = this.attachShadow({mode:'closed'});

        shadowRoot.appendChild(headerTemplate.content);
        
    }
}

customElements.define('header-component',Header)