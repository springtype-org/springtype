import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {MwcButton} from "./mwc-button";
import "@material/button/dist/mdc.button.min.css"

export default (component: MwcButton, theme: any): TypedMediaQueryStyleSheet => ({
    "mwc-button": {
        display: 'inline-flex',
        outline: 'none'
    },
    '.mdc-button': {
        flex: 1
    },
    '.mwc-button-shaped': {
        'border-radius': '18px'
    },
    '.mwc-button-shaped.mdc-button--dense ': {
        'border-radius': '16px'
    }
});
