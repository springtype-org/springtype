import {WebComponent, Lifecycle, Style, Template,Use} from "../../../../core";
import tpl from "./checkbox-page.tpl";
import style from "./checkbox-page.style";
import {MwcCheckbox} from "../../../src/component/mwc-checkbox";

@Use(MwcCheckbox)
@WebComponent('checkbox-page')
@Template(tpl)
@Style(style)
export class CheckboxPage extends HTMLElement {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'checkbox-page': Partial<CheckboxPage>;
        }
    }
}

