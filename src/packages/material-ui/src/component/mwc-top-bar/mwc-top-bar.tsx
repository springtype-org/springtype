import {WebComponent, Lifecycle, Style, Template, Field} from "../../../../core";
import tpl from "./mwc-top-bar.tpl";
import style from "./mwc-top-bar.style";
import {MDCTopAppBar} from '@material/top-app-bar';
import {OnBeforeFlow} from "../../../../core/src/webcomponent/src/decorator/lifecyle/OnBeforeFlow";

@WebComponent('mwc-top-bar')
@Template(tpl)
@Style(style)
export class MwcTopBar extends HTMLElement {

    @Field
    mwcInstance: MDCTopAppBar;

    @OnBeforeFlow(true)
    onBeforeFlow() {
        const topAppBarElement = this.querySelector('.mdc-top-app-bar');
        if (topAppBarElement) {
           this.mwcInstance = new MDCTopAppBar(topAppBarElement);
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-top-bar': Partial<MwcTopBar>
        }
    }
}

