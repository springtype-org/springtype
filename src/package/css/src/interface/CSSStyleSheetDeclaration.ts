import {CSSDeclarationBlock} from "./CSSDeclarationBlock";

export interface CSSStyleSheetDeclaration {
    [selector: string]: CSSDeclarationBlock;
}