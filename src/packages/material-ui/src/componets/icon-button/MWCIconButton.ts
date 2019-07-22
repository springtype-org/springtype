import {Attribute, CSSUnit, Lifecycle, Partial, Style, Template, WebComponent} from "@springtype/core";
import template from "./MWCIconButton.tpl";
import style from "./MWCIconButton.tss";
import {MDCRipple} from "@material/ripple/component";

@WebComponent('mwc-icon-button')
@Template(template)
@Style(style)
export class MWCIconButton extends HTMLElement implements Lifecycle {

    @Attribute
    'name-on': string;

    @Attribute
    'name-off': string;

    @Attribute
    'on': boolean;

    @Attribute
    size: number = 1;

    @Attribute
    'size-unit': CSSUnit = CSSUnit.EM;

    @Attribute
    label = '';

    @Attribute
    ripple = true;

    constructor(
        // forward-referenced binding and DI (@see template bind={{...}} on <button>)
        protected iconButton: HTMLElement
    ) {
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
            'mwc-icon-button': Partial<MWCIconButton>;
        }
    }
}