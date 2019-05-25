import {kebabToCamelCase} from "../function/kebabToCamelCase";
import {springTypeCorePackageDependency} from "../../../st-create-app/src/definition/dependencies";

export const styleTemplate = (elementName: string, style: any = {}) => {

    const elementClassName = kebabToCamelCase(elementName);

    if (!style) {
        style = {};
    }

    if (!style[':host']) {
        style[':host'] = {};
    }

    return `import {TypedStyleSheet} from "${springTypeCorePackageDependency}";
import {${elementClassName}} from "./${elementName}";

export default (element: ${elementClassName}, theme: any): TypedStyleSheet => (${JSON.stringify(style, null, 4)});`;
};