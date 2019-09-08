import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {TobBarPage} from "./tob-bar-page";

export default (component: TobBarPage, theme: any): TypedMediaQueryStyleSheet => ({
    "html, body, st-router-outlet, tob-bar-page": {
 height: "100%"
    }
});
