import {HOST_SELECTOR} from "./constant/HOST_SELECTOR";
import {CaseTransformer} from "../../lang";

export class CSSInlineStyleGenerator {

    static generateForStyleAttribute(declaration: any): any {

        const inlineStyles: any = {};

        for (let selector in declaration) {

            if (selector === HOST_SELECTOR) {

                // support for template-string based styling
                if (typeof declaration[selector] === 'string') {
                    return declaration[selector];
                }

                for (let identifier in declaration[selector]!) {
                    inlineStyles[CaseTransformer.camelToKebabCase(identifier)] = (declaration[selector] as any)[identifier];
                }
            }
        }
        return inlineStyles;
    }
}