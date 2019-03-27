import {
    Element,
    EventAttribute,
    HOST_SELECTOR,
    Lifecycle,
    ShadowAttachMode,
    ShadowDOM,
    Style,
    Template
} from "@springtype/springtype-incubator-core";
import template from "./Logo.tpl";

@Element('app-logo')
@ShadowDOM(ShadowAttachMode.CLOSED)
@Template(template)
@Style(() => ({
    [HOST_SELECTOR]: 'margin: 5px;'
}))
export class Logo extends HTMLElement implements Lifecycle {

    @EventAttribute
    onclick = () => {};
}