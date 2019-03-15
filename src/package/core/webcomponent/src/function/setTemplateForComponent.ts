import {StyleFunction} from "../../../tss";
import {STYLE} from "../constant/STYLE";
import {TEMPLATE} from "../constant/TEMPLATE";
import {TemplateFunction} from "../interface/TemplateFunction";

export const setTemplateForComponent = (webComponent: any, template: TemplateFunction) => {
    Reflect.set(webComponent, TEMPLATE, template);
};