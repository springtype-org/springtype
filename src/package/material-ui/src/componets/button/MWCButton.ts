import {Attribute, Style, Template, Element, WebComponentLifecycle} from "@springtype/springtype-incubator-core";
import template from "./MWCButton.tpl";
import style from "./MWCButton.tss";

@Element('mwc-button')
@Template(template)
@Style(style)
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
}