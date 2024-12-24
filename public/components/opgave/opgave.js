class OpgaveComponent extends HTMLElement {

    answer = '';
    id = '';

    connectedCallback() {
    }

    static get observedAttributes() {
        return ['text', 'persistence-id'];
    }

    attributeChangedCallback() {
        this.update();
    }

    update() {

        this.innerHTML = '';

        const text = this.getAttribute('text');
        this.id = this.getAttribute('persistence-id') ?? '';

        const label = document.createElement('label');
        label.textContent = text;
        label.setAttribute('for', this.id);
        const input = document.createElement('input');
        input.type = 'text';
        input.pattern = '[a-zA-Z]'
        input.onchange = (e) => this.handleInputChange(e);
        input.onkeydown = (e) => this.handleInputChange(e);
        input.onpaste = (e) => this.handleInputChange(e);
        input.oninput = (e) => this.handleInputChange(e);
        this.answer = localStorage.getItem(this.id) ?? '';
        input.value = this.answer ?? undefined;
        input.id = this.id;

        this.append(label, input);
    }

    handleInputChange(event) {
        const inputText = event.target.value;
        this.answer = inputText;
        localStorage.setItem(this.id, inputText);
        this.dispatchEvent(new Event('change', {bubbles: true}));
    }

}

export const registerOpgaveComponent = () => {
    customElements.define('x-opgave', OpgaveComponent);
}