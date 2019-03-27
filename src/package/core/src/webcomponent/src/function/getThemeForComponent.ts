import {COMPONENT_THEME} from "../constant/COMPONENT_THEME";

export const getThemeForComponent = (webComponent: any): any => {
    return Reflect.get(webComponent, COMPONENT_THEME);
};