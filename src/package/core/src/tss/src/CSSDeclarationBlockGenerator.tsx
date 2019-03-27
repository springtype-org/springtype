import {CaseTransformer} from "../../lang";

export class CSSDeclarationBlockGenerator {

    static generate(declaration: any) {

        let styles = '';

        // support for template-string based stylesheets
        if (typeof declaration === 'string') {
            return declaration;
        }

        for (let selector in declaration) {

            let styleMapping = '';

            for (let identifier in declaration[selector]!) {

                    if (typeof declaration[selector] === 'string') {

                        // support for template-string based block styles
                        styleMapping = declaration[selector] as string;
                    } else {

                        styleMapping = `${styleMapping}\n${
                            CaseTransformer.camelToKebabCase(identifier)
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