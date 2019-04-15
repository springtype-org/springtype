import {
    Element,
    EventAttribute,
    HOST_SELECTOR,
    Lifecycle,
    ShadowAttachMode,
    ShadowDOM,
    Style,
    Template, TypedMediaQueryStyleSheet, Partial
} from "@springtype/springtype-incubator-core";
import template from "./Logo.tpl";

@Element('app-logo')
@ShadowDOM(ShadowAttachMode.CLOSED)
@Template(template)
@Style((): TypedMediaQueryStyleSheet => ({
    [HOST_SELECTOR]: 'margin: 5px;',

    '@media (max-width: 70em)': {
        [HOST_SELECTOR]: 'margin: 15px;',
    }
}))
export class Logo extends HTMLElement implements Lifecycle {

    @EventAttribute
    onclick = (evt: Event) => {};
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-logo': Partial<Logo>;
        }
    }
}