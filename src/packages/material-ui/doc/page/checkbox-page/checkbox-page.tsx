import {WebComponent, Style, Template,Use} from "@springtype/core";
import tpl from "./checkbox-page.tpl";
import style from "./checkbox-page.style";
import { MwcCheckbox } from '@springtype/material-ui';

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

