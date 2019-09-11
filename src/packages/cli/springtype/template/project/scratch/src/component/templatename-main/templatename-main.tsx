import {WebComponent, Lifecycle, Style, Template} from "@springtype/core";
import tpl from "./templatename-main.tpl";
import style from "./templatename-main.style";

@WebComponent('templatename-main')
@Template(tpl)
@Style(style)
export class TemplateNameMain extends HTMLElement implements Lifecycle {

    constructor() {

        super();
    }
}
 
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'templatename-main': Partial<TemplateNameMain>;
        }
    }
}

