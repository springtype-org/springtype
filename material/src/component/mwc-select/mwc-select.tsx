import tpl from "./mwc-select.tpl"
import "@material/select/dist/mdc.select.min.css"
import {st} from "../../../../src/core/st";
import {attr, customElement} from "../../../../src/web/customelement";
import {ISelectItem} from "./ISelectItem";
import {prop} from "../../../../src/core/cd";

export type VariantType = false | 'fixed' | 'prominent' | 'fixed-prominent' | 'short' | 'fixed-short';


@customElement('mwc-select', {
    tpl,
    shadowMode: "none"
})
export class MwcSelect extends st.customElement {

    @attr()
    'mwc-items': ISelectItem[] = [];

    @attr()
    'mwc-label': string;

    @prop()
    selected: ISelectItem | undefined;

    onChange = (evt: any) => {
        evt.stopImmediatePropagation();
        this.selected = this["mwc-items"].find(value => value.value == evt.target.value);
        this.dispatchEvent(new CustomEvent('change', {detail: this.selected}));
        this.doRender();
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-select': Partial<MwcSelect>;
        }
    }
}
