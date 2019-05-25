import {
    Attribute, AttributeType,
    Element,
    EventAttribute,
    Lifecycle,
    Style,
    Template,
    Partial
} from "@springtype/core";
import template from "./MWCCheckbox.tpl";
import style from "./MWCCheckbox.tss";

@Element('mwc-checkbox')
@Template(template)
@Style(style)
export class MWCCheckbox extends HTMLElement implements Lifecycle {

    @Attribute(AttributeType.BOOLEAN)
    checked = false;

    @Attribute(AttributeType.BOOLEAN)
    indeterminate = false;

    @Attribute(AttributeType.BOOLEAN)
    disabled = false;

    @Attribute
    value = '';

    @EventAttribute
    onchange = (evt: Event) => {};
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mwc-checkbox': Partial<MWCCheckbox>;
        }
    }
}