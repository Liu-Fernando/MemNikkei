const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
<style>
    header {
        font-family: 'Noto Serif Japanese';
        background-color: #d52229;
        color: #ffffff;
        font-size: 8vw;
        width: 100%;
        
        
        justify-content: space-between;
        position: relative;
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

    div{
    display: flex;
    align-items: center;

    }

    ul{
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-itens:center;
        gap: 5px;
    }

    .menu-button{
        font-family: 'Noto Serif Japanese';
        background-color: #d52229;
        color: #ffffff;
        font-size: 8vw;
    }

    .close-menu-button{
    
        position: absolute;
        top: 20px;
        left: 35px;
        width: 20vw;
        height: 7vh;
        cursor: pointer;
    }

    .logoHeader{
    
    width:18vw;
    }

    a.btn{
    all: unset;
    box-sizing: border-box;

    font-family: Inter;
    width: 80vw;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;

    background-color: #1e2a38;
    color: white;

    padding: 10px 15px;
    border-radius: 10px;
    font-size: 7vw;
    font-weight: bold;
    text-align: center;

    text-decoration: none;
    cursor: pointer;
    }

    a.btn-menu{
    width: 80vw;
    height: 12vh;
}

    .close-menu-button{
        top: 20px;
        right: 20px;
        bottom-margin: 20px;
        position: absolute;
        font-size: 20px;
    }

    .nav-menu{
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 300vh;
    background-color: #ff8c88;
    justify-content: center;
    padding-top: 80px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 100vh;
    }

    .nav-menu.active{
    display:flex;
    }

</style>
    <header>
        <div>
            <img src="../../../static/MemLogo.png " class="logoHeader" alt="Logo"> 
            <a href="/paginaInicial">Memórias Nikkei</a>
        </div>
        <button class="menu-button">☰</button>

        <nav class="nav-menu">
            <button class="close-menu-button">←</button>
            <ul>
                <li><a href="" class="btn btn-menu">Voltar ao menu inicial</a></li>
                <li><a href="" class="btn btn-menu">Relembrar tradições</a></li>
                <li><a href="" class="btn btn-menu">Mural de histórias</a></li>
                <li><a href="" class="btn btn-menu">Minhas memórias</a></li>
                <li><a href="" class="btn btn-menu">Autoconhecimento</a></li>
                <li><a href="" class="btn btn-menu">Saúde mental e Longevidade</a></li>
                <li><a href="" class="btn btn-menu">Jogos cognitivos</a></li>
                <li><a href="" class="btn btn-menu">Conheça o projeto</a></li>
            </ul>
        </nav>
    </header>


`;


class Header extends HTMLElement{
    constructor(){
        super();
    }


    connectedCallback(){
        const shadowRoot = this.attachShadow({mode:'closed'});

        shadowRoot.appendChild(headerTemplate.content);
        const btun = shadowRoot.querySelector('.menu-button')
        const navMenu = shadowRoot.querySelector('.nav-menu')
        const closeBtun = shadowRoot.querySelector('.close-menu-button')

        btun.addEventListener('click', ()=> {
            navMenu.classList.toggle('active');
            document.body.style.overflow = 'hidden'
        });

        closeBtun.addEventListener('click', ()=> {
            navMenu.classList.remove('active');
            document.body.style.overflow = ''
        }); 

        
    }
}

customElements.define('header-component',Header)