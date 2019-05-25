import {kebabToCamelCase} from "../function/kebabToCamelCase";
import {springTypeCorePackageDependency} from "../../../st-create-app/src/definition/dependencies";

export const elementTemplate = (elementName: string) => {

    const elementClassName = kebabToCamelCase(elementName);
    return`import {Element, Lifecycle, Template, Style} from "${springTypeCorePackageDependency}";
import tpl from "./${elementName}.tpl";
import style from "./${elementName}.style";

@Element('${elementName}')
@Template(tpl)
@Style(style)
export class ${elementClassName} extends HTMLElement implements Lifecycle {

    
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            '${elementName}': Partial<${elementClassName}>;
        }
    }
}
`;
};
