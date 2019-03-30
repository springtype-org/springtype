import {TemplateFunction} from "../../interface/TemplateFunction";

const TEMPLATE = 'TEMPLATE';

export const getTemplateForComponent = (webComponent: any): TemplateFunction => {
    return Reflect.get(webComponent, TEMPLATE);
};

export const setTemplateForComponent = (webComponent: any, template: TemplateFunction) => {
    Reflect.set(webComponent, TEMPLATE, template);
};