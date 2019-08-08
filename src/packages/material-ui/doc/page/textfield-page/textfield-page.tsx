import {Lifecycle, Style, Template, Use, WebComponent} from "@springtype/core";
import tpl from "./textfield-page.tpl";
import style from "./textfield-page.style";
import {MWCTextfield} from "../../..";

@Use(MWCTextfield)
@WebComponent('textfield-page')
@Template(tpl)
@Style(style)
export class TextfieldPage extends HTMLElement implements Lifecycle {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'textfield-page': Partial<TextfieldPage>;
        }
    }
}

