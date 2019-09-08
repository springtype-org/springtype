import {WebComponent, Lifecycle, Style, Template, Use} from "@springtype/core";
import tpl from "./button-page.tpl";
import style from "./button-page.style";
import {MWCButton} from "../../..";


@Use(MWCButton)
@WebComponent('button-page')
@Template(tpl)
@Style(style)
export class ButtonPage extends HTMLElement implements Lifecycle {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'button-page': Partial<ButtonPage>;
        }
    }
}

