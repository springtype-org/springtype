import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {TemplateNameMain} from "./templatename-main";

export default (component: TemplateNameMain, theme: any): TypedMediaQueryStyleSheet => ({
    "body, html": {
        "padding": "0",
        "margin": "0",
        "height": "100%",
        "background": "#000",
    },
    "templatename-main": {
        "position": "absolute",
        "display": "block",
        "height": "100%",
        "width": "100%",
    }
});
