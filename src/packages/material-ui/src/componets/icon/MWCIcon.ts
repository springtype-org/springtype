import {Attribute, CSSUnit, Lifecycle, Partial, Style, Template, WebComponent} from "@springtype/core";
import template from "./MWCIcon.tpl";
import style from "./MWCIcon.tss";

@WebComponent('mwc-icon')
@Template(template)
@Style(style)
export class MWCIcon extends HTMLElement implements Lifecycle {

    @Attribute
    name: string;

    @Attribute
    size: number = 1;

    @Attribute
    'size-unit': CSSUnit = CSSUnit.EM;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-icon': Partial<MWCIcon>;
        }
    }
}