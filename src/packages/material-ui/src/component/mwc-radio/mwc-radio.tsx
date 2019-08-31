import {WebComponent, Style, Template, Attribute, EventAttribute,OnBeforeFlow} from "@springtype/core";
import tpl from "./mwc-radio.tpl";
import style from "./mwc-radio.style";
import {MDCRipple} from "@material/ripple";

@WebComponent('mwc-radio')
@Template(tpl)
@Style(style)
export class MwcRadio extends HTMLElement {
    @Attribute
    checked = false;

    @Attribute
    indeterminate = false;

    @Attribute
    disabled = false;

    @Attribute
    value = '';

    @Attribute
    name = '';

    @Attribute
    label = '';

    @EventAttribute
    onchange = (evt: Event) => {
    };

    constructor(protected radio: HTMLInputElement) {
        super();
    }

    @OnBeforeFlow(true)
    onFlow() {
        MDCRipple.attachTo(this.radio);
    }

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-radio': Partial<MwcRadio>;
        }
    }
}
