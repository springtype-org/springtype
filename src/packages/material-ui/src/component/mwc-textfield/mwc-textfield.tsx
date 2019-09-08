import {WebComponent, Style, Template, Attribute, EventAttribute, OnAfterFlow} from "@springtype/core";
import tpl from "./mwc-textfield.tpl";
import style from "./mwc-textfield.style";
import {MDCTextField} from "@material/textfield";
import {DEFAULT_MWC_TEXTFIELD_VARIANT_TYPE, MWC_TEXTFIELD_VARIANT_TYPE} from "./mwc-textfield-variant-type";

@WebComponent('mwc-textfield')
@Template(tpl)
@Style(style)
export class MwcTextfield extends HTMLElement {
    @Attribute
    variant: MWC_TEXTFIELD_VARIANT_TYPE = DEFAULT_MWC_TEXTFIELD_VARIANT_TYPE;

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

    mwcInstance: MDCTextField;

    constructor(public inputEL: HTMLInputElement,
                public labelEL: HTMLLabelElement,
    ) {
        super();
    }

    @OnAfterFlow(true)
    onBeforeFlow() {
        const textField = this.querySelector('.mdc-text-field');
            console.log('i222n',this.mwcInstance)
        if (textField) {

            this.mwcInstance = new MDCTextField(textField);
            console.log('in',this.mwcInstance)
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-textfield': Partial<MwcTextfield>;
        }
    }
}

