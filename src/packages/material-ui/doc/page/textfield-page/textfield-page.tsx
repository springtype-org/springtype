import { Style, Template, Use, WebComponent } from "@springtype/core";
import { MwcTextfield } from '@springtype/material-ui';
import style from "./textfield-page.style";
import tpl from "./textfield-page.tpl";

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

