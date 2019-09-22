import {Attribute, CustomElement, ILifecycle} from "../../../../src/web/customelement";
import {Prop} from "../../../../src/core/cd";
import tpl from "./mwc-top-bar.tpl"
import tss, {HEIGHT, HEIGHT_DENSE} from "./mwc-top-bar-override.tss"
import "@material/top-app-bar/dist/mdc.top-app-bar.css"
import "@material/icon-button/dist/mdc.icon-button.css"

export type VariantType = false | 'fixed' | 'prominent' | 'fixed-prominent' | 'short' | 'fixed-short';

@CustomElement('mwc-top-bar', {tpl, shadowMode: "none", tss})
export class MwcTopBar extends HTMLElement implements ILifecycle {

    @Attribute()
    'mwc-dense': boolean = false;

    @Attribute()
    'mwc-title': string = '';

    @Attribute()
    'mwc-variant': VariantType = false;


    @Attribute()
    'menu-open': boolean = false;

    @Attribute()
    'mwc-scrolled': boolean = false;

    @Prop()
    prop: {offsetWidth: number } = { offsetWidth: 0};

    constructor() {
        super();
    }

    onAfterRender(): void {
        this.prop.offsetWidth = (<any>this.querySelector('#fixed')).offsetWidth;
        console.log('render', this.prop.offsetWidth)
    }

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-top-bar': Partial<MwcTopBar>;
        }
    }
}
