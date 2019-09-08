import {WebComponent, Lifecycle, Style, Template, Use} from "@springtype/core";
import tpl from "./index-page.tpl";
import style from "./index-page.style";

@WebComponent('index-page')
@Template(tpl)
@Style(style)
export class IndexPage extends HTMLElement {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'index-page': Partial<IndexPage>;
        }
    }
}

