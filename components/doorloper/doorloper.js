import { opgavenH } from "../../data/opgaven-h.js";
import { opgavenV } from "../../data/opgaven-v.js";


class DoorloperComponent extends HTMLElement {

    static sizeH = 21;
    static sizeV = 21;

    opgavenHComponent = document.createElement('x-opgaven');
    opgavenVComponent = document.createElement('x-opgaven');

    diagram = document.createElement('x-diagram');

    connectedCallback() {       
        this.opgavenHComponent['opgaven'] = opgavenH; 
        this.opgavenHComponent.id = 'opgaven-horizontaal'
        this.opgavenHComponent.setAttribute('summary', 'Horizontaal');
        this.opgavenHComponent.addEventListener('change', () => this.collectAnswers());

        this.append(this.opgavenHComponent);

        this.opgavenVComponent['opgaven'] = opgavenV; 
        this.opgavenVComponent.id = 'opgaven-verticaal'
        this.opgavenVComponent.setAttribute('summary', 'Verticaal');
        this.opgavenVComponent.addEventListener('change', () => this.collectAnswers());

        this.append(this.opgavenVComponent);

        this.diagram.setAttribute('size-h', `${DoorloperComponent.sizeH}`);
        this.diagram.setAttribute('size-v', `${DoorloperComponent.sizeV}`);  
        this.append(this.diagram);

        this.collectAnswers();
    }

    collectAnswers() {
        const answersHorizontaal = this.opgavenHComponent.answers;
        const answersVerticaal = this.opgavenVComponent.answers;

        console.log('Horizontaal', answersHorizontaal.join(''));
        console.log('Verticaal', answersVerticaal.join(''));

        this.diagram['answersH'] = answersHorizontaal;
        this.diagram['answersV'] = answersVerticaal;

    }

}

export const registerDoorloperComponent = () => {
    customElements.define('x-doorloper', DoorloperComponent);
}


