class DiagramComponent extends HTMLElement {

    sizeH = 1;
    sizeV = 1;

    _answersH = [];
    _answersV = [];

    connectedCallback() {
        this.update();
    }

    static get observedAttributes() {
        return ['size-h', 'size-v'];
    }

    attributeChangedCallback() {
        this.update();
    }

    update() {
        this.sizeH = Number(this.getAttribute('size-h'));
        this.sizeV = Number(this.getAttribute('size-v'));

        this.innerHTML = '<table class="container"></table>';

        for (let v = 0; v < this.sizeV; v++) {
            const row = document.createElement('tr');
            for (let h = 0; h < this.sizeH; h++) {
                const answerH = this.getHAnswerAt(this._answersH, h, v);
                const answerV = this.getVAnswerAt(this._answersV, v, h);

                const cell = this.cellForAnswers(answerH, answerV);
                row.append(cell);
            }
    
            this.querySelector('table')?.append(row);
        }
        
    }

    cellForAnswers(a, b) {
        const equal = a == b;
        const bothFilled = a.trim() && b.trim();

        const cell = document.createElement('td');
        cell.classList.add('cell');
        if (equal && bothFilled) {
            cell.classList.add('equal');
        }
        let content = (bothFilled) ? `<span class="small"><span class="h">${a}</span><span class="separator">/</span><span class="v">${b}</span></span>` : `<span class="h">${a}</span><span class="v">${b}</span>`;
        if (equal) {
            content = a;
        }
        cell.innerHTML = content;
        return cell;
    }

    get totalCells() {
        return this.sizeH * this.sizeV;
    }

    set answersH(answers) {
        this._answersH = this.pad(answers);
        console.log(this._answersH);
        this.update();
    }

    set answersV(answers) {
        this._answersV = this.pad(answers);
        this.update();
    }

    pad(answers) {
        return answers.join('');
    }

    getHAnswerAt(array, x, y) {
        return array[y * this.sizeV + x] ?? '';
    }

    getVAnswerAt(array, x, y) {
        return array[y * this.sizeH + x] ?? '';
    }
}



export const registerDiagramComponent = () => {
    customElements.define('x-diagram', DiagramComponent);
}


