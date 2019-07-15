import {WebComponent, Lifecycle, Style, Template} from "@springtype/core";
import tpl from "./templatename.tpl";
import style from "./templatename.style";

@WebComponent('templatename')
@Template(tpl)
@Style(style)
export class TemplateName extends HTMLElement implements Lifecycle {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'template-name': Partial<TemplateName>;
        }
    }
}

