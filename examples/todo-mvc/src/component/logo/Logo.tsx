import {
    Template,
    Element,
    WebComponentLifecycle,
    ShadowDOM,
    ShadowAttachMode
} from "@springtype/springtype-incubator-core";
import template from "./Logo.tpl";

@Element('app-logo')
@ShadowDOM(ShadowAttachMode.CLOSED)
@Template(template)
export class Logo extends HTMLElement implements WebComponentLifecycle {
}