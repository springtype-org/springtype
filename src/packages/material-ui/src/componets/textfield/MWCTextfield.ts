import {Attribute, EventAttribute, Lifecycle, Partial, Style, Template, WebComponent} from '@springtype/core';
import {MDCTextField} from '@material/textfield';
import template from './MWCTextfield.tpl';
import style from './MWCTextfield.tss';

export enum MWCTEXTFIELD_VARIANT_TYPE {
    FILLED = 'filled',
    OUTLINED = 'outlined'
}

@WebComponent('mwc-textfield')
@Template(template)
@Style(style)
export class MWCTextfield extends HTMLElement implements Lifecycle {

    @Attribute
    variant: MWCTEXTFIELD_VARIANT_TYPE = MWCTEXTFIELD_VARIANT_TYPE.FILLED;

    @Attribute
    disabled = false;

    @Attribute
    'trailing-icon' = false;

    @Attribute
    icon = '';

    @Attribute
    shaped = false;


    @Attribute
    label = '';

    @Attribute
    value = '';

    @EventAttribute
    onchange: () => void;

    @EventAttribute
    onfocus: () => void;

    @EventAttribute
    onblur: () => void;

    @EventAttribute
    onkeypress: () => void;

    @EventAttribute
    onkeyup = (evt: KeyboardEvent) => {
    };

    textfieldInstance: MDCTextField;


    constructor(public inputEL: HTMLInputElement,
                public labelEL: HTMLLabelElement,
    ) {
        super();
    }

    onFlow(initial: boolean) {
        const textfield = this.querySelector('.mdc-text-field');
        if (textfield) {
            this.textfieldInstance = new MDCTextField(textfield);
        }

    }


}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-textfield': Partial<MWCTextfield>;
        }
    }
}



