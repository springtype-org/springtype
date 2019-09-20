import {PopupPage} from "./popup-page";
import {ITypedStyleSheet} from "../../../../../src/web/tss";

export default (component: PopupPage): ITypedStyleSheet => ({
    "popup-page": {},
    "button": {
        "height": "30px",
        "width": "30px",
        "outline": "none",
    }
});
