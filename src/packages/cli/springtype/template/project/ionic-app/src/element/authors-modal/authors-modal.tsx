import {WebComponent, Lifecycle, Template, Style} from "@springtype/core";
import tpl from "./authors-modal.tpl";
import style from "./authors-modal.style";
import {Components} from "@ionic/core";

@WebComponent('st-authors-modal')
@Template(tpl)
@Style(style)
export class AuthorsModal extends HTMLElement implements Lifecycle {

    modal: Components.IonModal;

    constructor()  {
        super();

        console.log('AuthorModal', this, arguments);
    }

    onCloseClick = (evt: MouseEvent) => {
        this.modal.dismiss();
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-authors-modal': Partial<AuthorsModal>;
        }
    }
}

