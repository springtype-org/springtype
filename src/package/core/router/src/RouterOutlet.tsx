import {ActiveRoute} from "./ActiveRoute";
import {
    Attribute,
    Element,
    WebComponentLifecycle
} from "../../webcomponent";

import "../../webcomponent/src/component/ErrorMessage";
import {LocationChangeDecision} from "./interface/LocationChangeDecision";
import {Renderer} from "../../renderer/src/decorator/Renderer";
import {VirtualElement} from "../../renderer";
import {ErrorMessage} from "../../index";
import {UseComponent} from "../../webcomponent/src/decorator/UseComponent";
import {getRenderer} from "../../renderer/src/function/getRenderer";

@Renderer({})
@Element('st-router-outlet')
@UseComponent(ErrorMessage)
export class RouterOutlet extends HTMLElement implements WebComponentLifecycle {

    locationChangeDecision: LocationChangeDecision;

    @Attribute
    component: VirtualElement;

    constructor(public connected: boolean,
                protected activeRoute: ActiveRoute) {

        super();

        this.activeRoute.routerImpl.registerRouterOutlet(this);
        this.activeRoute.routerImpl.enable();
    }

    present(locationChangeDecision: LocationChangeDecision): void {

        this.locationChangeDecision = locationChangeDecision;

        // clean renderer caches on whole re-render
        getRenderer().cleanCaches();

        if (this.connected!) {
            this.component = this.locationChangeDecision.component;
        }
    }

    onFlow(initial: boolean) {

        if (initial) {
            this.component = this.locationChangeDecision.component;
        }
    }

    render() {

        if (this.component) {
            return this.component;
        }
        return <st-error-message message={"ERROR (RouterOutlet): No component found for route!"} /> as VirtualElement;
    }
}