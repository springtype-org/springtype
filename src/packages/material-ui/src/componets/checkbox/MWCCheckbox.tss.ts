import {HOST_SELECTOR} from "@springtype/core";
import {MWCCheckbox} from "./MWCCheckbox";
import {TypedStyleSheet} from "@springtype/core";

export default (view: MWCCheckbox): TypedStyleSheet => ({

    [HOST_SELECTOR]: {
        outline: 'none'
    },

    ['.foobar']: {

    }
});


