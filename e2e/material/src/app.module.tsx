import {customElementsHMRPolyfill} from "../../../src/web/polyfill";
import {Route} from "../../../src/web/router/decorator/Route";
import {TopBarPage} from "./pages/topbar/topbar-page";

if (process.env.NODE_ENV === "development") {
    customElementsHMRPolyfill;
}

@Route(TopBarPage.ROUTE, TopBarPage)
export class AppModule {

}
