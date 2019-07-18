import {WebComponent, Lifecycle, Template, Use} from "@springtype/core";
import tpl from "./templatename-app.tpl";
import {Components} from "@ionic/core";
import {AuthorsModal} from "../authors-modal/authors-modal";

// NOTICE: This is a most simple integration example!
// In a real-world app, you would like to NOT put every markup
// in the main app template but split each section into web components on their own
// and the main app web component would handle routing, i18n setup
// and it's template just the binding. You can take a look at the todo-mvc
// example for such a more elaborated example.

@Use(AuthorsModal)
@WebComponent('templatename-app')
@Template(tpl)
export class TemplateNameApp extends HTMLElement implements Lifecycle {

    modal: Components.IonModal;

    constructor(protected modalController: Components.IonModalController) {
        super();
    }

    onOpenModalClick = async() => {

        console.log('protected modalController', this.modalController);

        this.modal = await this.modalController.create({
            component: 'st-authors-modal'
        });

        await this.modal.present();
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'templatename-app': Partial<TemplateNameApp>;
        }
    }
}


