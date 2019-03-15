import {Attribute, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./MWCCheckbox.tpl";
import style from "./MWCCheckbox.tss";

@WebComponent({
    tag: 'mwc-checkbox',
    template,
    style
})
export class MWCCheckbox extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    checked = false;

    @Attribute
    indeterminate = false;

    @Attribute
    disabled = false;

    @Attribute
    value = '';

    @Attribute
    change = () => {};
}