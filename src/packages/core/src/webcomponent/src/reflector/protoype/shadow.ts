import {ShadowAttachMode} from "../../../index";

const SHADOW = 'SHADOW';
const SHADOW_ATTACH_MODE = 'SHADOW_ATTACH_MODE';

export const getShadowAttachModeForComponent = (webComponent: any): ShadowAttachMode => {
    return Reflect.get(webComponent, SHADOW_ATTACH_MODE);
};

export const getShadowForComponent = (webComponent: any) => {
    return Reflect.get(webComponent, SHADOW);
};


export const setShadowForComponent = (webComponent: any, hasShadowDOM: boolean) => {
    return Reflect.set(webComponent, SHADOW, hasShadowDOM);
};

export const setShadowAttachModeForComponent = (webComponent: any, shadowAttachMode: ShadowAttachMode) => {
    return Reflect.set(webComponent, SHADOW_ATTACH_MODE, shadowAttachMode);
};
