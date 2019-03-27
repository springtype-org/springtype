import {TemplateFunction} from "../interface/TemplateFunction";
import {TEMPLATE} from "../constant/TEMPLATE";

export const getTemplateForComponent = (webComponent: any): TemplateFunction => {
    return Reflect.get(webComponent, TEMPLATE);
};