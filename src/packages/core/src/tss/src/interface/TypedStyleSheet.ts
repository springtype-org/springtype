import {TypedCSSStyleDeclaration} from "./TypedCSSStyleDeclaration";
import {Partial} from "../../../lang";

export interface TypedStyleSheet {
    [selector: string]: Partial<TypedCSSStyleDeclaration>;
}

export interface TypedMediaQueryStyleSheet {
    [mediaQueryOrSelector: string]: {
        [selector: string]: Partial<TypedCSSStyleDeclaration>;
    } | Partial<TypedCSSStyleDeclaration>;
}