import tpl from "./mwc-top-bar.tpl"
import "@material/top-app-bar/dist/mdc.top-app-bar.css"
import "@material/icon-button/dist/mdc.icon-button.css"
import {st} from "../../../../src/core/st";
import {attr, customElement} from "../../../../src/web/customelement";
import tss from "./mwc-top-bar-override.tss"

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

    'mwc-select-data': { width?: string, scrolled: boolean } = {
        scrolled: false
    };

    constructor() {
        super();
    }

    onConnect() {
        const parent: any = this.parentElement;
        if (parent) {
            parent.addEventListener('scroll', () => {
                const scrollY: number = parent.pageYOffset !== undefined ? parent.pageYOffset : parent.scrollTop;
                const scrolled = scrollY != 0;
                if (this["mwc-select-data"].scrolled != scrolled) {
                    this["mwc-select-data"].scrolled = scrolled;
                    this.doRenderStyle()
                }
            });
        }
        window.addEventListener('resize', this.widthFunction)
    }

    onAfterInitialRender() {
        this.widthFunction();
    }

    widthFunction = () => {
        const widthDiv = this.querySelector("#width-div");
        const toolbar = this.querySelector('#mdc-top-app-bar');
        if (widthDiv && toolbar) {
            const width = widthDiv.getBoundingClientRect().width + 'px';
            if (this["mwc-select-data"].width != width) {
                this["mwc-select-data"].width = width;
            } else {
                this["mwc-select-data"].width = undefined;
            }
            this.doRenderStyle()
        }
    };
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-top-bar': Partial<MwcTopBar>;
        }
    }
}
