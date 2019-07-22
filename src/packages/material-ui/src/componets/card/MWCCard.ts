import {Attribute, Lifecycle, Partial, Style, Template, WebComponent} from "@springtype/core";
import template from "./MWCCard.tpl";
import style from "./MWCCard.tss";

@WebComponent('mwc-card')
@Template(template)
@Style(style)
export class MWCCard extends HTMLElement implements Lifecycle {

    @Attribute
    height = 350;

    @Attribute
    width = 350;


    constructor() {
        super();

    }


}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-card': Partial<MWCCard>;
        }
    }
}