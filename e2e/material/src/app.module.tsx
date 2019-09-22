import {customElementsHMRPolyfill} from "../../../src/web/polyfill/custom-elements-hmr-polyfill";
import {TopBarPage} from "./pages/topbar/topbar-page";
import {route} from "../../../src/web/router";

if (process.env.NODE_ENV === "development") {
    customElementsHMRPolyfill;
}


@route(TopBarPage.ROUTE, TopBarPage)
export class AppModule {

}
