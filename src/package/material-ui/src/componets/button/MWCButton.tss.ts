import {MWCButton} from "./MWCButton";
import {HOST_SELECTOR} from "@springtype/springtype-incubator-core";

export default (view: MWCButton) => ({

    [HOST_SELECTOR]: {
        display: 'inline-flex',
        outline: 'none'
    },

    '.mdc-button': {
        flex: 1
    }

});


