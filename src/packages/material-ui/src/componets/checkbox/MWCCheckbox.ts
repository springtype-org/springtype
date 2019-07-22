import {Attribute, EventAttribute, Lifecycle, Partial, Style, Template, WebComponent} from "@springtype/core";
import template from "./MWCCheckbox.tpl";
import style from "./MWCCheckbox.tss";

@WebComponent('mwc-checkbox')
@Template(template)
@Style(style)
export class MWCCheckbox extends HTMLElement implements Lifecycle {

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
    onchange = (evt: Event) => {};

    constructor(protected checkbox: HTMLInputElement) {
        super();

    }

    onFlow(initial: boolean) {
        if (initial && this.indeterminate) {
            this.checkbox.indeterminate = true;
        }
    }

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-checkbox': Partial<MWCCheckbox>;
        }
    }
}