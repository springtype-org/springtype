import {TypedMediaQueryStyleSheet} from "../../../../core";
import {MwcTextfield} from "./mwc-textfield";

import '@material/textfield/dist/mdc.textfield.min.css'

export default (component: MwcTextfield, theme: any): TypedMediaQueryStyleSheet => ({
    "mwc-textfield": {
        display: 'inline-flex',
        outline: 'none'
    },
    ".mwc-text-field-outlined-leading-shaped": {
        "border-radius": "28px 0 0 28px !important",
        width: "28px !important"
    },
    ".mwc-text-field-outlined-trailing-shaped": {
        "border-radius": "0 28px 28px 0 !important",
        width: "28px !important"

    },
    ".mwc-text-field-filled-shaped": {
        "border-radius": "16px 16px 0 0 !important"
    }

});
