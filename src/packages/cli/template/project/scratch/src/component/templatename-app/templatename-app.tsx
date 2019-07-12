import {Element, Lifecycle, Style, Template} from "@springtype/core";
import tpl from "./templatename-app.tpl";
import style from "./templatename-app.style";

@Element('templatename-app')
@Template(tpl)
@Style(style)
export class TemplateNameApp extends HTMLElement implements Lifecycle {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'template-name-app': Partial<TemplateNameApp>;
        }
    }
}

