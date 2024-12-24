class OpgavenComponent extends HTMLElement {

    _opgaven = [];

    connectedCallback() {
    }

    static get observedAttributes() {
        return ['summary'];
    }

    attributeChangedCallback() {
        this.update();
    }

    set opgaven(opgaven) {
        this._opgaven = opgaven.map(tekst => {
            const opgave = document.createElement('x-opgave');
            opgave.setAttribute('text', tekst);
            return opgave;
        });
        this.update();
    }

    update() {

        this.innerHTML = '';
        const summaryText = this.getAttribute('summary');
        const details = document.createElement('details');
        details.setAttribute('open', '');
        const summary = document.createElement('summary');
        summary.textContent = summaryText

        for (let i = 0; i < this._opgaven.length; i++) {
            const opgave = this._opgaven[i];
            opgave.setAttribute('persistence-id', `${summaryText}-${i}`)
            details.append(opgave);
        }

        details.append(summary);

        this.append(details);
    }


    get answers() {
        return this._opgaven.map(opgave => opgave.answer).map(a => a.toUpperCase());
    }

}

export const registerOpgavenComponent = () => {
    customElements.define('x-opgaven', OpgavenComponent);
}