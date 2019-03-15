import {ShadowAttachMode} from "../../index";
import {SHADOW} from "../constant/SHADOW";
import {SHADOW_ATTACH_MODE} from "../constant/SHADOW_ATTACH_MODE";

export const setShadowAndAttachModeForComponent = (webComponent: any, shadowAttachMode?: ShadowAttachMode) => {

    Reflect.set(webComponent, SHADOW, true);

    if (shadowAttachMode) {
        Reflect.set(webComponent, SHADOW_ATTACH_MODE, shadowAttachMode);
    }
};