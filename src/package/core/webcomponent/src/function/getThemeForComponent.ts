import {StyleFunction} from "../../../tss";
import {STYLE} from "../constant/STYLE";
import {TemplateFunction} from "../interface/TemplateFunction";
import {TEMPLATE} from "../constant/TEMPLATE";
import {COMPONENT_THEME} from "../constant/COMPONENT_THEME";

export const getThemeForComponent = (webComponent: any): any => {
    return Reflect.get(webComponent, COMPONENT_THEME);
};