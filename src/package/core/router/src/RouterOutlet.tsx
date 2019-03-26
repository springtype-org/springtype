import {ActiveRoute} from "./ActiveRoute";
import {
    Attribute,
    Element,
    Lifecycle
} from "../../webcomponent";

import "../../webcomponent/src/component/ErrorMessage";
import {LocationChangeDecision} from "./interface/LocationChangeDecision";
import {Renderer} from "../../renderer/src/decorator/Renderer";
import {VirtualElement} from "../../renderer";
import {ErrorMessage} from "../../index";
import {UseElement} from "../../webcomponent/src/decorator/UseElement";
import {getRenderer} from "../../renderer/src/function/getRenderer";

@Renderer({})
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