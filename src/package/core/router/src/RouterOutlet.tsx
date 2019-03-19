import {ActiveRoute} from "./ActiveRoute";
import {
    Attribute,
    Element,
    WebComponentLifecycle,
    WebComponentLifecycleEvent
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

    mounted: boolean;

    @Attribute
    component: VirtualElement;

    constructor(protected activeRoute: ActiveRoute) {

        super();

        this.activeRoute.routerImpl.registerRouterOutlet(this);
        this.activeRoute.routerImpl.enable();
    }

    present(locationChangeDecision: LocationChangeDecision): void {

        // clean renderer caches on whole re-render
        getRenderer().cleanCaches();

        const onAfterMount = () => {
            this.component = locationChangeDecision.component;
        };

        const onMount = () => {
            this.removeEventListener(WebComponentLifecycleEvent.FLOW, onMount);
            onAfterMount();
        };


        if (this.mounted) {
            onAfterMount();
        } else {
            this.addEventListener(WebComponentLifecycleEvent.FLOW, onMount);
        }
    }

    render() {

        if (this.component) {
            return this.component;
        }
        // @ts-ignore
        return (<st-error-message message={"ERROR (RouterOutlet): No component found for route!"} />);
    }
}