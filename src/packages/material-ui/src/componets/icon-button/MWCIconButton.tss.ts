import {MWCIconButton} from "./MWCIconButton";
import {HOST_SELECTOR, TypedStyleSheet} from "@springtype/core";

export default (view: MWCIconButton): TypedStyleSheet => ({

    [HOST_SELECTOR]: {
        display: 'inline-block',
    },

    'i.material-icons': {
        fontSize: `${view.size}${view["size-unit"]}`,
    }

});


