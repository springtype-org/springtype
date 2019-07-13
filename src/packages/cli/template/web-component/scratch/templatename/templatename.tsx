import {Element, Lifecycle, Style, Template} from "@springtype/core";
import tpl from "./templatename.tpl";
import style from "./templatename.style";

@Element('templatename')
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

