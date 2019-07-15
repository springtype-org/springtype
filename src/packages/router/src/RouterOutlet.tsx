import {ActiveRoute} from "./ActiveRoute";
import {
    Attribute,
    WebComponent,
    ErrorMessage,
    getRenderer,
    Lifecycle,
    Use,
    VirtualElement,
    ActiveRenderer,
} from "@springtype/core";

import {LocationChangeDecision} from "./interface/LocationChangeDecision";
import {Partial} from "@springtype/core";

@WebComponent('st-router-outlet')
@Use(ErrorMessage)
export class RouterOutlet extends HTMLElement implements Lifecycle {

    locationChangeDecision: LocationChangeDecision;

    @Attribute
    element: VirtualElement|null;

    constructor(protected activeRoute: ActiveRoute) {

        super();

        this.activeRoute.routerImpl.registerRouterOutlet(this);
        this.activeRoute.routerImpl.enable();
    }

    refresh() {
        this.element = null; // chance reference to trigger re-flow
        this.element = this.locationChangeDecision.element;
    }

    present(locationChangeDecision: LocationChangeDecision): void {

        this.locationChangeDecision = locationChangeDecision;

        // clean renderer caches on whole re-render
        getRenderer().cleanCaches();

        if (this.isConnected) {
            this.element = this.locationChangeDecision.element;
        }
    }

    onFlow(initial: boolean) {

        if (initial) {
            this.element = this.locationChangeDecision.element;
        }
    }

    render() {

        if (this.element) {
            return this.element;
        }
        return <st-error-message message={"ERROR (RouterOutlet): No component found for route!"} /> as VirtualElement;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-router-outlet': Partial<RouterOutlet>;
        }
    }
}