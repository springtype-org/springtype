import {
    Attribute, AttributeType,
    Element,
    Lifecycle,
    Style,
    Template,
    Partial
} from "@springtype/springtype-incubator-core";
import template from "./MWCButton.tpl";
import style from "./MWCButton.tss";
import {MDCRipple} from '@material/ripple';

@Element('mwc-button')
@Template(template)
@Style(style)
export class MWCButton extends HTMLElement implements Lifecycle {

    @Attribute(AttributeType.BOOLEAN)
    raised = false;

    @Attribute(AttributeType.BOOLEAN)
    unelevated = false;

    @Attribute(AttributeType.BOOLEAN)
    outlined = false;

    @Attribute(AttributeType.BOOLEAN)
    dense = false;

    @Attribute(AttributeType.BOOLEAN)
    disabled = false;

    @Attribute(AttributeType.BOOLEAN)
    ripple = true;

    @Attribute(AttributeType.BOOLEAN)
    trailingIcon = false;

    @Attribute
    icon = '';

    @Attribute
    label = '';

    constructor(
        // forward-referenced binding and DI (@see template bind={{...}} on <button>)
        protected button: HTMLButtonElement
    ) {
        super();
    }

    onFlow(initial: boolean) {

        if (initial && this.ripple) {
            MDCRipple.attachTo(this.button);
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-button': Partial<MWCButton>;
        }
    }
}