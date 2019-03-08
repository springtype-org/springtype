import * as _ from "lodash";
import {NestedCSSSelectors} from "typestyle/lib/types";

export class CSSDeclarationBlockGenerator {

    static generate(declaration: NestedCSSSelectors) {

        let styles = '';

        for (let selector in declaration) {

            let styleMapping = '';

            for (let identifier in declaration[selector]!) {

                    styleMapping = `${styleMapping}\n${
                        _.kebabCase(identifier)
                    }: ${(declaration[selector] as any)[identifier]};`;
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