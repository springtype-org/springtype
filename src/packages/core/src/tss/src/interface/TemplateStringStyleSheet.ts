import {Partial} from "../../../lang";
import {TypedCSSStyleDeclaration} from "./TypedCSSStyleDeclaration";

export interface TemplateStringStyleSheet {
    [selectorOrMediaQuery: string]: string|Partial<TypedCSSStyleDeclaration>;
}
