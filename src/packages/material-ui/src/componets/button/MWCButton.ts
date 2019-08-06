import {Attribute, EventAttribute, Lifecycle, Partial, Style, Template, WebComponent} from "@springtype/core";
import template from "./MWCButton.tpl";
import style from "./MWCButton.tss";
import {MDCRipple} from "@material/ripple/component";

export enum MWCBUTTON_VARIANT_TYPE {
    TEXT = 'text',
    RAISED = 'raised',
    UNELEVATED = 'unelevated',
    OUTLINED = 'outlined'
}

@WebComponent('mwc-button')
@Template(template)
@Style(style)
export class MWCButton extends HTMLElement implements Lifecycle {

    @Attribute
    variant: MWCBUTTON_VARIANT_TYPE = MWCBUTTON_VARIANT_TYPE.TEXT;

    @Attribute
    dense: boolean = false;

    @Attribute
    shaped = false;

    @Attribute
    disabled = false;

    @Attribute
    'trailing-icon' = false;

    @Attribute
    icon = '';

    @Attribute
    label = '';

    @EventAttribute
    onclick = (evt: Event) => {
    };

    rippleInstance: MDCRipple;

    constructor() {
        super();
    }

    onBeforeFlow(initial: boolean) {
        const button = this.querySelector('.mdc-button');
        if (button) {
            this.rippleInstance = new MDCRipple(button);

        }
    }

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-button': Partial<MWCButton>;
        }
    }
}