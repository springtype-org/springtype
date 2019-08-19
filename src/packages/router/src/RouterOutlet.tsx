import {ActiveRoute} from "./ActiveRoute";
import {
    OnBeforeFlow,
    WebComponent,
    ErrorMessage,
    getRenderer,
    Partial,
    Use,
    VirtualElement,
    ActiveRenderer, Field,
} from "@springtype/core";

import {LocationChangeDecision} from "./interface/LocationChangeDecision";

@Use(ErrorMessage)
@WebComponent('st-router-outlet')
export class RouterOutlet extends HTMLElement {

    locationChangeDecision: LocationChangeDecision;

    @Field
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

    @OnBeforeFlow(true)
    onFlow() {
        this.element = this.locationChangeDecision.element;
    }

    render() {

        if (this.element) {
            return this.element;
        }
        return <st-error-message message={"ERROR (RouterOutlet): No component found for route!"}/> as VirtualElement;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-router-outlet': Partial<RouterOutlet>;
        }
    }
}