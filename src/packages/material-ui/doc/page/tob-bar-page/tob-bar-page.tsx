import {WebComponent, Lifecycle, Style, Template, Use} from "../../../../core";
import tpl from "./tob-bar-page.tpl";
import style from "./tob-bar-page.style";
import {MwcTopBar} from "../../../src/component/mwc-top-bar/mwc-top-bar";
import {MwcSnackbar} from "../../../src/component/mwc-snackbar/mwc-snackbar";

@Use(MwcTopBar,MwcSnackbar)
@WebComponent('tob-bar-page')
@Template(tpl)
@Style(style)
export class TobBarPage extends HTMLElement {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'tob-bar-page': Partial<TobBarPage>;
        }
    }
}

