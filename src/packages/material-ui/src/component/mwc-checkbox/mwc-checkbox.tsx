import {WebComponent, Lifecycle, Style, Template, Attribute, EventAttribute} from "../../../../core";
import tpl from "./mwc-checkbox.tpl";
import style from "./mwc-checkbox.style";
import {DEFAULT_MWC_CHECKBOX_CHECKED_TYPE, MWC_CHECKBOX_CHECKED_TYPE} from "./mwc-ceckbox-checked-type";
import {OnBeforeFlow} from "../../../../core/src/webcomponent/src/decorator/lifecyle/OnBeforeFlow";


@WebComponent('mwc-checkbox')
@Template(tpl)
@Style(style)
export class MwcCheckbox extends HTMLElement {

    @Attribute
    checked: MWC_CHECKBOX_CHECKED_TYPE=  DEFAULT_MWC_CHECKBOX_CHECKED_TYPE;

    @Attribute
    disabled = false;

    @Attribute
    value = '';

    @Attribute
    name = '';

    @Attribute
    label = '';

    @EventAttribute
    onchange = (evt: Event) => {};

    constructor(protected checkbox: HTMLInputElement) {
        super();

    }
    @OnBeforeFlow(true)
    onBeforeFlow() {
        if (this.checked === 'indeterminate') {
            this.checkbox.indeterminate = true;
        }
    }

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-checkbox': Partial<MwcCheckbox>;
        }
    }
}

