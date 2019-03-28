import {ActiveRoute} from "./ActiveRoute";
import {Attribute, Element, ErrorMessage, Lifecycle} from "@springtype/springtype-incubator-core";

import {LocationChangeDecision} from "./interface/LocationChangeDecision";
import {Renderer} from "@springtype/springtype-incubator-core";
import {UseElement} from "@springtype/springtype-incubator-core";
import {getRenderer} from "@springtype/springtype-incubator-core";
import {VirtualElement} from "@springtype/springtype-incubator-core";

@Element('st-router-outlet')
@UseElement(ErrorMessage)
export class RouterOutlet extends HTMLElement implements Lifecycle {

    locationChangeDecision: LocationChangeDecision;

    @Attribute
    component: VirtualElement|null;

    constructor(protected activeRoute: ActiveRoute) {

        super();

        this.activeRoute.routerImpl.registerRouterOutlet(this);
        this.activeRoute.routerImpl.enable();
    }

    refresh() {
        this.component = null; // chance reference to trigger re-flow
        this.component = this.locationChangeDecision.component;
    }

    present(locationChangeDecision: LocationChangeDecision): void {

        this.locationChangeDecision = locationChangeDecision;

        // clean renderer caches on whole re-render
        getRenderer().cleanCaches();

        if (this.isConnected) {
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