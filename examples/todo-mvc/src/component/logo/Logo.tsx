import {
    Template,
    Element,
    WebComponentLifecycle,
    ShadowDOM,
    ShadowAttachMode, EventAttribute
} from "@springtype/springtype-incubator-core";
import template from "./Logo.tpl";

@Element('app-logo')
@ShadowDOM(ShadowAttachMode.CLOSED)
@Template(template)
export class Logo extends HTMLElement implements WebComponentLifecycle {

    @EventAttribute
    onclick = (evt: Event) => {
        console.log('wtf?');
    };

    constructor(public svg: SVGElement) {
        super();
    }

    onFlow(initial: boolean) {

        if (initial) {

            this.svg.addEventListener('click', (evt: Event) => {
                this.onclick(evt);
                evt.stopPropagation();
            });
        }
    }
}