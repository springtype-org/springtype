import {StyleFunction} from "../../../tss";
import {STYLE} from "../constant/STYLE";
import {TEMPLATE} from "../constant/TEMPLATE";
import {TemplateFunction} from "../interface/TemplateFunction";
import {COMPONENT_THEME} from "../constant/COMPONENT_THEME";

export const setThemeForComponent = (webComponent: any, theme: any) => {
    Reflect.set(webComponent, COMPONENT_THEME, theme);
};