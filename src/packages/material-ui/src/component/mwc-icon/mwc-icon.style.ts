import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {MwcIcon} from "./mwc-icon";

export default (component: MwcIcon, theme: any): TypedMediaQueryStyleSheet => ({
    "mwc-icon":{
        display: 'inline-flex',
        outline: 'none'
    },

    'i.material-icons': {
        fontSize: `${component.size}${component["size-unit"]}`,
    }
});
