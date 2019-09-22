import tpl from "./mwc-select.tpl"
import "@material/select/dist/mdc.select.min.css"
import {st} from "../../../../src/core/st";
import {attr, customElement} from "../../../../src/web/customelement";
import {tsx} from "../../../../src/web/vdom";
import {ISelectItem} from "./ISelectItem";

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
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-select': Partial<MwcSelect>;
        }
    }
}
