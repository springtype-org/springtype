import {
    WebComponent,
    Style,
    Template,
    Attribute,
    Field,
    ActiveLifecycle,
    OnBeforeFlow
} from "@springtype/core";
import tpl from "./mwc-button.tpl";
import style from "./mwc-button.style";
import {DEFAULT_MWC_BUTTON_VARIANT_TYPE, MWC_BUTTON_VARIANT_TYPE} from "./mwc-button-variant-type";
import {MDCRipple} from "@material/ripple/component";

@WebComponent('mwc-button')
@Template(tpl)
@Style(style)
export class MwcButton extends HTMLElement {


    @Attribute
    variant: MWC_BUTTON_VARIANT_TYPE = DEFAULT_MWC_BUTTON_VARIANT_TYPE;

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
    label = 'test';

    _onclick = (evt: Event) => {
    };

    rippleInstance: MDCRipple;

    constructor(protected button: HTMLButtonElement, public lifecycle: ActiveLifecycle) {
        super();
    }

    @OnBeforeFlow(true)
    onBeforeFlow() {
        if (this.button) {
            this.rippleInstance = new MDCRipple(this.button);
        }
    }
}


declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-button': Partial<MwcButton>;
        }
    }
}

