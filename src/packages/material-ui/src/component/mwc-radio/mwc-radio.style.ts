import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {MwcRadio} from "./mwc-radio";

import '@material/radio/dist/mdc.radio.min.css';
import '@material/form-field/dist/mdc.form-field.min.css';

export default (component: MwcRadio, theme: any): TypedMediaQueryStyleSheet => ({
    "mwc-radio": {
        display: 'inline-flex',
        outline: 'none'
    }
});
