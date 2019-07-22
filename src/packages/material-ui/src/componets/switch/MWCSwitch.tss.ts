import {HOST_SELECTOR, TypedStyleSheet} from "@springtype/core";
import {MWCSwitch} from "./MWCSwitch";

export default (view: MWCSwitch): TypedStyleSheet => ({

    [HOST_SELECTOR]: {
        outline: 'none'
    },
    '.mdc-switch + label': {
        'margin-left': '10px'
    }
});


