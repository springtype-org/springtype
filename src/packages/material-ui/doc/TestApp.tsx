import { Route } from "@springtype/router";
import { applyPolyfill, ReflowStrategy } from "custom-elements-hmr-polyfill";
import { ButtonPage } from "./page/button-page/button-page";
import { CheckboxPage } from "./page/checkbox-page/checkbox-page";
import { IndexPage } from "./page/index-page/index-page";
import { SwitchPage } from "./page/switch-page/switch-page";
import { TextfieldPage } from "./page/textfield-page/textfield-page";
import { TobBarPage } from "./page/tob-bar-page/tob-bar-page";

if (process.env.NODE_ENV === 'development') {
    applyPolyfill(ReflowStrategy.NONE, -1, () => {
        document.location.reload();
    });
}

@Route('mwc-button', ButtonPage)
@Route('mwc-textfield', TextfieldPage)
@Route('mwc-checkbox', CheckboxPage)
@Route('mwc-switch', SwitchPage)
@Route('mwc-top-bar', TobBarPage)
@Route('*', IndexPage)
export class TestApp {
}