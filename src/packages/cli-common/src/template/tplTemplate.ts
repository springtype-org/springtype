import {kebabToCamelCase} from "../function/kebabToCamelCase";
import {springTypeCorePackageDependency} from "../../../st-create-app/src/definition/dependencies";

export const tplTemplate = (elementName: string, tpl: string = '') => {

    const elementClassName = kebabToCamelCase(elementName);

    tpl = tpl ? tpl : `<div>${elementName}</div>`;

    return `import {ActiveRenderer} from '${springTypeCorePackageDependency}';
import {${elementClassName}} from "./${elementName}";

export default (element: ${elementClassName}) => ${tpl};
`;
};