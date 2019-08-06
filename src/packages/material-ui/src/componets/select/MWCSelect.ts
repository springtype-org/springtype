import {Attribute, EventAttribute, Lifecycle, Partial, Style, Template, WebComponent} from "@springtype/core";
import template from "./MWCSelect.tpl";
import style from "./MWCSelect.tss";
import {MDCSelect} from '@material/select';


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

    selectInstance: MDCSelect;

    constructor(protected select: HTMLButtonElement) {
        super();
    }

    onBeforeFlow(initial: boolean) {
        const select = this.querySelector('.mdc-select');
        if (select) {
            this.selectInstance = new MDCSelect(select);
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