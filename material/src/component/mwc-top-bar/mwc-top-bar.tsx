import tpl from "./mwc-top-bar.tpl"
import "@material/top-app-bar/dist/mdc.top-app-bar.css"
import "@material/icon-button/dist/mdc.icon-button.css"
import {st} from "../../../../src/core/st";
import {attr, customElement} from "../../../../src/web/customelement";
import {prop} from "../../../../src/core/cd";
import tss from "./mwc-top-bar-override.tss"
import {tsx} from "../../../../src/web/vdom";

export type VariantType = false | 'fixed' | 'prominent' | 'fixed-prominent' | 'short' | 'fixed-short';


@customElement('mwc-top-bar', {
    tpl,
    shadowMode: "none",
    tss
})
export class MwcTopBar extends st.customElement {

    @attr()
    'mwc-dense': boolean = false;

    @attr()
    'mwc-title': string = '';

    @attr()
    'mwc-variant': VariantType = false;

    @attr()
    'menu-open': boolean = false;

    @attr()
    'mwc-scrolled': boolean = false;

    @prop()
    prop: { offsetWidth: number } = {offsetWidth: 0};

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-top-bar': Partial<MwcTopBar>;
        }
    }
}
