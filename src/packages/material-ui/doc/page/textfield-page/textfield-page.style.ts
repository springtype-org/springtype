import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {TextfieldPage} from "./textfield-page";
import "@material/textfield/dist/mdc.textfield.min.css"

export default (component: TextfieldPage, theme: any): TypedMediaQueryStyleSheet => ({
    "textfield-page": {

    },
    "th": {
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
