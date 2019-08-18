import {WebComponent, Lifecycle, Style, Template, Attribute} from "../../../../core";
import tpl from "./mwc-icon-button.tpl";
import style from "./mwc-icon-button.style";
import {MDCRipple} from "@material/ripple/component";

@WebComponent('mwc-icon-button')
@Template(tpl)
@Style(style)
export class MwcIconButton extends HTMLElement {
    @Attribute
    'name-on': string;

    @Attribute
    'name-off': string;

    @Attribute
    'on': boolean;

    @Attribute
    size: number = 1;

    @Attribute
    'size-unit' = 'em';

    @Attribute
    label = '';

    @Attribute
    ripple = true;

    constructor(protected iconButton: HTMLElement) {
        super();

    }

    toggleOnClick = () => {
        this.on = !this.on;
        if (this.ripple) {
            MDCRipple.attachTo(this.iconButton, {isUnbounded: true});
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-icon-button': Partial<MwcIconButton>;
        }
    }
}

