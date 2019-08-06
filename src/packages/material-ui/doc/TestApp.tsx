import {Route, ROUTE_BASE, ROUTE_NOT_FOUND} from "@springtype/router";
import {ButtonPage} from "./page/button-page/button-page";
import {TextfieldPage} from "./page/textfield-page/textfield-page";

@Route('mwc-button', ButtonPage)
@Route('mwc-textfield', TextfieldPage)
export class TestApp {
}