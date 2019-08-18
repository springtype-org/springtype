import {WebComponent, Lifecycle, Style, Template,Use} from "../../../../core";
import tpl from "./switch-page.tpl";
import style from "./switch-page.style";
import {MwcSwitch} from "../../..";

@Use(MwcSwitch)
@WebComponent('switch-page')
@Template(tpl)
@Style(style)
export class SwitchPage extends HTMLElement {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'switch-page': Partial<SwitchPage>;
        }
    }
}

