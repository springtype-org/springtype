import {CSSStyleSheetDeclaration} from "./interface/CSSStyleSheetDeclaration";
import {toKebabCase} from "../../lang";

export class CSSDeclarationBlockGenerator {

    static generate(declaration: CSSStyleSheetDeclaration) {

        let styles = '';

        for (let selector in declaration) {

            let styleMapping = '';

            for (let identifier in declaration[selector]) {

                if (declaration[selector].hasOwnProperty(identifier)) {
                    styleMapping = `${styleMapping}\n${
                        toKebabCase(identifier)
                    }: ${(declaration[selector] as any)[identifier]};`;
                }
            }

            styles = `${styles} \n\n${selector} {
                ${styleMapping}
            }`;
        }

        return <style type="text/css">

            {
                styles
            }

        </style>
    }
}