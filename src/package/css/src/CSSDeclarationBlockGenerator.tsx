import {CSSStyleSheetDeclaration} from "./interface/CSSStyleSheetDeclaration";

export class CSSDeclarationBlockGenerator {

    static generate(declaration: CSSStyleSheetDeclaration) {

        console.log('Generating for declaration', declaration);

        let styles = '';

        for (let selector in declaration) {

            let styleMapping = '';

            for (let identifier in declaration[selector]) {

                if (declaration[selector].hasOwnProperty(identifier)) {
                    styleMapping = `${styleMapping}\n${identifier}: ${declaration[selector][identifier]};`;
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