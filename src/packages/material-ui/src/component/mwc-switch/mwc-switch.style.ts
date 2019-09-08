import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {MwcSwitch} from "./mwc-switch";

import "@material/switch/dist/mdc.switch.min.css";

export default (component: MwcSwitch, theme: any): TypedMediaQueryStyleSheet => ({
    "mwc-switch": {
        display: 'inline-flex',
        outline: 'none'
    },
    ".mdc-switch+label": {
        "margin-left": "15px",
    }
});
