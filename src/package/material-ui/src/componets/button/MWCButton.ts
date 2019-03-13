import {Attribute, WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./MWCButton.tpl";
import style from "./MWCButton.tss";

@WebComponent({
    tag: 'mwc-button',
    template,
    style
})
export class MWCButton extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    raised = false;

    @Attribute
    unelevated = false;

    @Attribute
    outlined = false;

    @Attribute
    dense = false;

    @Attribute
    disabled = false;

    @Attribute
    'trailing-icon' = false;

    @Attribute
    icon = '';

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