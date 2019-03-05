import {CSSStyleSheetDeclaration} from "./interface/CSSStyleSheetDeclaration";
import {Partial, toKebabCase} from "../../lang";

// see: https://developer.mozilla.org/en-US/docs/Web/CSS/:host()
export const HOST_SELECTOR = ':host';

export class CSSInlineStyleGenerator {

    static generateComponentStyles(declaration: CSSStyleSheetDeclaration): Partial<CSSStyleDeclaration> {
        
        const inlineStyles: Partial<CSSStyleDeclaration> = {};

        for (let selector in declaration) {

            if (selector === HOST_SELECTOR) {

                for (let identifier in declaration[selector]) {

                    if (declaration[selector].hasOwnProperty(identifier)) {
                        inlineStyles[toKebabCase(identifier) as any] = (declaration[selector] as any)[identifier];
                    }
                }
            }
        }
        return inlineStyles;
    }
}