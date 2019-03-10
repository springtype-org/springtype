import * as _ from "lodash";
import {NestedCSSProperties, NestedCSSSelectors} from "typestyle/lib/types";
import {HOST_SELECTOR} from "./constant/HOST_SELECTOR";

export class CSSInlineStyleGenerator {

    static generateComponentStyles(declaration: NestedCSSSelectors): NestedCSSProperties {
        
        const inlineStyles: any = {};

        for (let selector in declaration) {

            if (selector === HOST_SELECTOR) {

                for (let identifier in declaration[selector]!) {
                    inlineStyles[_.kebabCase(identifier)] = (declaration[selector] as any)[identifier];
                }
            }
        }
        return inlineStyles;
    }
}