import {SHADOW} from "../constant/SHADOW";

export const getShadowForComponent = (webComponent: any) => {
    return Reflect.get(webComponent, SHADOW);
};