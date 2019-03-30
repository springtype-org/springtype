import {TypedMediaQueryStyleSheet, TypedStyleSheet} from "./TypedStyleSheet";
import {TemplateStringStyleSheet} from "./TemplateStringStyleSheet";

export interface StyleFunction {
    (webComponent: any, theme?: any): TypedStyleSheet|TypedMediaQueryStyleSheet|TemplateStringStyleSheet;
}