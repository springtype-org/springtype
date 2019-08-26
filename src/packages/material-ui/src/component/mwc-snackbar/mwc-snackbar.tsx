import {WebComponent, Style, Template, OnBeforeFlow, OnAfterFlow} from "@springtype/core";
import tpl from "./mwc-snackbar.tpl";
import style from "./mwc-snackbar.style";
import {MDCSnackbar} from '@material/snackbar';

@WebComponent('mwc-snackbar')
@Template(tpl)
@Style(style)
export class MwcSnackbar extends HTMLElement {

    snackbarInstance: MDCSnackbar;

    constructor(protected switchElement: HTMLInputElement) {
        super();
    }

    @OnAfterFlow(true)
    onBeforeFlow() {
        const snackbarElement = this.querySelector('.mdc-snackbar');
        if (snackbarElement) {
            this.snackbarInstance = new MDCSnackbar(snackbarElement);

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

