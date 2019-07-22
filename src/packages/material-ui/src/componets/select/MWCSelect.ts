import {Attribute, EventAttribute, Lifecycle, Partial, Style, Template, WebComponent} from "@springtype/core";
import template from "./MWCSelect.tpl";
import style from "./MWCSelect.tss";
import {MDCRipple} from "@material/ripple/component";


@WebComponent("mwc-select")
@Template(template)
@Style(style)
export class MWCSelect extends HTMLElement implements Lifecycle {

    @Attribute
    disabled = false;

    @Attribute
    ripple = true;

    @Attribute
    label = '';

    @Attribute
    name = '';

    @EventAttribute
    onchange = (evt: Event) => {
    };

    constructor(protected select: HTMLButtonElement) {
        super();
    }

    onFlow(initial: boolean) {
        if (initial && this.select) {
            MDCRipple.attachTo(this.select);
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "mwc-select": Partial<MWCSelect>;
        }
    }
}