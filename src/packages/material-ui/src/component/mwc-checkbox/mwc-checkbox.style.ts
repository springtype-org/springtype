import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {MwcCheckbox} from "./mwc-checkbox";

import "@material/checkbox/dist/mdc.checkbox.min.css"
import "@material/form-field/dist/mdc.form-field.min.css"

export default (component: MwcCheckbox, theme: any): TypedMediaQueryStyleSheet => ({
    "mwc-checkbox": {
        display: 'inline-flex',
        outline: 'none'
    }
});
