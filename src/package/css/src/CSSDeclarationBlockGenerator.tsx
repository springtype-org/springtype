import {CSSStyleSheetDeclaration} from "./interface/CSSStyleSheetDeclaration";


export class CSSDeclarationBlockGenerator {

    static toKebabCase(name: string): string {
        return name
            .replace(/([a-z])([A-Z])/g, '$1-$2')    // get all lowercase letters that are near to uppercase ones
            .replace(/[\s_]+/g, '-')                // replace all spaces and low dash
            .toLowerCase();
    }

    static generate(declaration: CSSStyleSheetDeclaration) {

        console.log('Generating for declaration', declaration);

        let styles = '';

        for (let selector in declaration) {

            let styleMapping = '';

            for (let identifier in declaration[selector]) {

                if (declaration[selector].hasOwnProperty(identifier)) {
                    styleMapping = `${styleMapping}\n${
                        CSSDeclarationBlockGenerator.toKebabCase(identifier)
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