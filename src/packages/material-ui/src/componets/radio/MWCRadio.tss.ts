import {HOST_SELECTOR, TypedStyleSheet} from "@springtype/core";
import {MWCRadio} from "./MWCRadio";

export default (view: MWCRadio): TypedStyleSheet => ({
    [HOST_SELECTOR]: {
        outline: 'none'
    }
});


