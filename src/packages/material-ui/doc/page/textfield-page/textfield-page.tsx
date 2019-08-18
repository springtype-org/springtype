import {Lifecycle, Style, Template, Use, WebComponent} from "@springtype/core";
import tpl from "./textfield-page.tpl";
import style from "./textfield-page.style";
import {MwcTextfield} from "../../..";

@Use(MwcTextfield)
@WebComponent('textfield-page')
@Template(tpl)
@Style(style)
export class TextfieldPage extends HTMLElement {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'textfield-page': Partial<TextfieldPage>;
        }
    }
}

