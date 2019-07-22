import {HOST_SELECTOR, TypedStyleSheet} from "@springtype/core";
import {MWCSelect} from "./MWCSelect";

export default (view: MWCSelect): TypedStyleSheet => ({

    [HOST_SELECTOR]: {
        outline: 'none'
    }
});


