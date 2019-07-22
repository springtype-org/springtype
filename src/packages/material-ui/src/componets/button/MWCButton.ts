import {Attribute, Lifecycle, Partial, Style, Template, WebComponent} from "@springtype/core";
import template from "./MWCButton.tpl";
import style from "./MWCButton.tss";
import {MDCRipple} from '@material/ripple';

@WebComponent('mwc-button')
@Template(template)
@Style(style)
export class MWCButton extends HTMLElement implements Lifecycle {

    @Attribute
    raised = false;

    @Attribute
    unelevated = false;

    @Attribute
    outlined = false;

    @Attribute
    dense = false;

    @Attribute
    disabled = false;

    @Attribute
    ripple = true;

    @Attribute
    'trailing-icon' = false;

    @Attribute
    icon = '';

    @Attribute
    label = '';

    mdcRipple: MDCRipple;

    constructor(
        // forward-referenced binding and DI (@see template bind={{...}} on <button>)
        protected button: HTMLButtonElement
    ) {
        super();
    }

    onFlow(initial: boolean) {
        if (initial) {
            this.mdcRipple = MDCRipple.attachTo(this.button);
        }
    }

    doFlow(){
        if (this.ripple) {
            this.mdcRipple.disabled = false;
            console.log('active')
        } else {
            this.mdcRipple.disabled = true;
            console.log('deactivaed')
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