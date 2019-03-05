import {CSSStyleSheetDeclaration} from "./interface/CSSStyleSheetDeclaration";
import {Partial, toKebabCase} from "../../lang";

export const COMPONENT_SELECTOR = ':component';

export class CSSInlineStyleGenerator {

    static generateComponentStyles(declaration: CSSStyleSheetDeclaration): Partial<CSSStyleDeclaration> {

        console.log('Generating for declaration', declaration);

        const inlineStyles: Partial<CSSStyleDeclaration> = {};

        for (let selector in declaration) {

            if (selector === COMPONENT_SELECTOR) {

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