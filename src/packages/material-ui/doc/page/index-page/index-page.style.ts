import {TypedMediaQueryStyleSheet} from "@springtype/core";
import {IndexPage} from "./index-page";

export default (component: IndexPage, theme: any): TypedMediaQueryStyleSheet => ({
    "html, body, st-router-outlet, index-page": {
        height: "100%"
    }
});
