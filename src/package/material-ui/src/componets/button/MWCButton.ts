import {WebComponent, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./MWCButton.tpl";

@WebComponent({
    tag: 'mwc-button',
    template,
})
export class MWCButton extends HTMLElement implements WebComponentLifecycle {

  //  @Attribute
    raised = false;

    //@Attribute
    unelevated = false;

    //@Attribute
    outlined = true;

    //@Attribute
    dense = true;

    //@Attribute
    disabled = false;

    //@Attribute
    trailingIcon = false;

    //@Attribute
    icon = '';

    //@Attribute
    label = 'click me';


}