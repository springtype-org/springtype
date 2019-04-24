import {kebabToCamelCase} from "../function/kebabToCamelCase";

export const appTsxTemplate = (appName: string) => `import {Element, Lifecycle, UseElement, Template, Style} from "@springtype/springtype-incubator-core";

@Element('${appName}-app')
@Template(view => <div>Hello, world!</div>)
@Style(view => ({
    'div': {
        backgroundColor: '#cc0000'
    }
}))
export class ${kebabToCamelCase(`${appName}-app`)} extends HTMLElement implements Lifecycle {

}`;