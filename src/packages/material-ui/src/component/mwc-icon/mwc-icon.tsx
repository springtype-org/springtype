import {WebComponent, Style, Template, Attribute} from "@springtype/core";
import tpl from "./mwc-icon.tpl";
import style from "./mwc-icon.style";

@WebComponent('mwc-icon')
@Template(tpl)
@Style(style)
export class MwcIcon extends HTMLElement {
    @Attribute
    name: string;

    @Attribute
    size: number = 1;

    @Attribute
    'size-unit' = 'em';
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-icon': Partial<MwcIcon>;
        }
    }
}

