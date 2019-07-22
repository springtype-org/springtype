import {HOST_SELECTOR, TypedStyleSheet} from "@springtype/core";
import {MWCTextfield} from "./MWCTextfield";

export default (view: MWCTextfield): TypedStyleSheet => {
    return ({

        [HOST_SELECTOR]: {
            outline: 'none'
        },
        '.mdc-help--float-above-width': {
            'width': view.labelWidth
        }
    });
};

