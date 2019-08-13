import {WebComponent, Lifecycle, Style, Template, Use} from "@springtype/core";
import tpl from "./templatename-main.tpl";
import style from "./templatename-main.style";
import {FirstScene} from "../first-scene/first-scene";

@WebComponent('templatename-main')
@Template(tpl)
@Style(style)
@Use(FirstScene)
export class TemplateNameMain extends HTMLElement implements Lifecycle {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'templatename-main': Partial<TemplateNameMain>;
        }
    }
}

