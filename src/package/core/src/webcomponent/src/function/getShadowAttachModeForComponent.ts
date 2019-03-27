import {SHADOW_ATTACH_MODE} from "../constant/SHADOW_ATTACH_MODE";
import {ShadowAttachMode} from "../..";

export const getShadowAttachModeForComponent = (webComponent: any): ShadowAttachMode => {
    return Reflect.get(webComponent, SHADOW_ATTACH_MODE);
};