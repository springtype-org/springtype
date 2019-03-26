import {
    Template,
    Element,
    Lifecycle,
    ShadowDOM,
    ShadowAttachMode, EventAttribute, Style, HOST_SELECTOR
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