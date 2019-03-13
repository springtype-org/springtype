import {Attribute, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./MWCButton.tpl";

@WebComponent({
    tag: 'mwc-button',
    template,
})
export class MWCButton extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    raised = true;

    @Attribute
    unelevated = false;

    @Attribute
    outlined = false;

    @Attribute
    dense = false;

    @Attribute
    disabled= false;

    @Attribute
    trailingIcon = false;

    @Attribute
    icon = 'favorite';

    @Attribute
    label = '';


    mountChildren(): void {
        const innerButton = this.querySelector("button");
        if (innerButton) {
            if (this.disabled) {
                innerButton.setAttribute("disabled", 'true');
            } else {
                innerButton.removeAttribute("disabled")
            }
        }
    }
}