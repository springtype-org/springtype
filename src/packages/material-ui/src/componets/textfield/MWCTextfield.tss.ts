import {TypedStyleSheet} from "@springtype/core";
import {MWCTextfield} from "./MWCTextfield";

export default (view: MWCTextfield): TypedStyleSheet => {
    return ({

        'mwc-textfield': {
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
};

