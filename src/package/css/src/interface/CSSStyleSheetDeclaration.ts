import {Partial} from "../../../lang";

export type colors = 'red' | 'green';

export interface EnhancedDef extends Partial<CSSStyleDeclaration> {
    backgroundColor: string | colors;
    color: string | colors;
}

export interface CSSStyleSheetDeclaration {
    [selector: string]: Partial<EnhancedDef>;
}