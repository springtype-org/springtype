import {HOST_SELECTOR} from "@springtype/springtype-incubator-core";
import {MWCCheckbox} from "./MWCCheckbox";
import {TypedStyleSheet} from "@springtype/springtype-incubator-core";

export default (view: MWCCheckbox): TypedStyleSheet => ({

    [HOST_SELECTOR]: {
        outline: 'none'
    },

    ['.foobar']: {

    }
});


