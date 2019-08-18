import {WebComponent, Lifecycle, Style, Template} from "../../../../core";
import tpl from "./mwc-snackbar.tpl";
import style from "./mwc-snackbar.style";
import {MDCSnackbar} from '@material/snackbar';
import {OnBeforeFlow} from "../../../../core/src/webcomponent/src/decorator/lifecyle/OnBeforeFlow";

@WebComponent('mwc-snackbar')
@Template(tpl)
@Style(style)
export class MwcSnackbar extends HTMLElement {

    constructor(protected switchElement: HTMLInputElement) {
        super();
    }

    @OnBeforeFlow(true)
    onBeforeFlow() {
        const snackbarElement = this.querySelector('.mdc-snackbar');
        if (snackbarElement) {
            const snackbar = new MDCSnackbar(snackbarElement);

        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-snackbar': Partial<MwcSnackbar>;
        }
    }
}

