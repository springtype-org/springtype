import {
    WebComponent,
    EventAttribute,
    HOST_SELECTOR,
    Lifecycle,
    Partial,
    ShadowAttachMode,
    ShadowDOM,
    Style,
    Template,
    TypedMediaQueryStyleSheet
} from "@springtype/core";
import template from "./Logo.tpl";

@WebComponent('app-logo')
@ShadowDOM(ShadowAttachMode.CLOSED)
@Template(template)
@Style((): TypedMediaQueryStyleSheet => ({
    [HOST_SELECTOR]: 'margin: 5px;',

    '@media (max-width: 70em)': {
        [HOST_SELECTOR]: 'margin: 15px;',
    }
}))
export class Logo extends HTMLElement {
 
    @EventAttribute
    onclick = (evt: Event) => {
    };
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-logo': Partial<Logo>;
        }
    }
}