import {Attribute, Element, EventAttribute, Lifecycle, Style, Template} from "@springtype/springtype-incubator-core";
import template from "./MWCCheckbox.tpl";
import style from "./MWCCheckbox.tss";

@Element('mwc-checkbox')
@Template(template)
@Style(style)
export class MWCCheckbox extends HTMLElement implements Lifecycle {

    @Attribute
    checked = false;

    @Attribute
    indeterminate = false;

    @Attribute
    disabled = false;

    @Attribute
    value = '';

    @EventAttribute
    onchange = (evt: Event) => {};
}