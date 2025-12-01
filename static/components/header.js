const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = 
;

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