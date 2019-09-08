import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {MwcIconButton} from "./mwc-icon-button";

export default (component: MwcIconButton, theme: any): TypedMediaQueryStyleSheet => ({
    "mwc-icon-button": {
        display: 'inline-flex',
        outline: 'none'
    }
});
