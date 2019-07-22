import {MWCIcon} from "./MWCIcon";
import {HOST_SELECTOR, TypedStyleSheet} from "@springtype/core";

export default (view: MWCIcon): TypedStyleSheet => ({

    [HOST_SELECTOR]: {
        display: 'inline-block',
    },

    'i.material-icons': {
        fontSize: `${view.size}${view["size-unit"]}`,
    }

});


