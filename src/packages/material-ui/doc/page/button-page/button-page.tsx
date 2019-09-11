import {WebComponent, Style, Template, Use} from "@springtype/core";
import tpl from "./button-page.tpl";
import style from "./button-page.style";
import { MwcButton } from '@springtype/material-ui';


@Use(MwcButton)
@WebComponent('button-page')
@Template(tpl)
@Style(style)
export class ButtonPage extends HTMLElement {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'button-page': Partial<ButtonPage>;
        }
    }
}

