import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {ButtonPage} from "./button-page";

export default (component: ButtonPage, theme: any): TypedMediaQueryStyleSheet => ({
    "button-page": {
    },"th": {
        "border-bottom": "2px solid black"
    },
    "td, th": {
        "text-align": "left",
        "padding-left": "10px"
    },
    "tbody:first-child": {
        "padding-top": "10px"
    },
    "td": {
        "padding-bottom": "10px"
    }
});
