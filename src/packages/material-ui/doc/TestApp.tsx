import {Route} from "@springtype/router";
import {ButtonPage} from "./page/button-page/button-page";
import {TextfieldPage} from "./page/textfield-page/textfield-page";
import {CheckboxPage} from "./page/checkbox-page/checkbox-page";
import {SwitchPage} from "./page/switch-page/switch-page";
import {TobBarPage} from "./page/tob-bar-page/tob-bar-page";

@Route('mwc-button', ButtonPage)
@Route('mwc-textfield', TextfieldPage)
@Route('mwc-checkbox', CheckboxPage)
@Route('mwc-switch', SwitchPage)
@Route('mwc-top-bar', TobBarPage)
export class TestApp {
}