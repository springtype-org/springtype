import {ActiveRoute} from "./ActiveRoute";
import {WebComponent, WebComponentLifecycle, WebComponentLifecycleEvent} from "../../webcomponent";

import "../../webcomponent/src/component/ErrorComponent";
import {LocationChangeDecision} from "./interface/LocationChangeDecision";
import {Renderer} from "../../renderer/src/decorator/Renderer";
import {VirtualElement} from "../../renderer";

interface RouterProps {
    component: VirtualElement;
    id: number;
}

@Renderer({})
@WebComponent({
    tag: 'st-router-outlet'
})
export class RouterOutlet extends HTMLElement implements WebComponentLifecycle {

    mounted!: boolean;

    constructor(public props: RouterProps,
                protected activeRoute: ActiveRoute) {

        super();

        this.activeRoute.routerImpl.registerRouterOutlet(this);
        this.activeRoute.routerImpl.enable();
    }

    present(locationChangeDecision: LocationChangeDecision): void {

        const onAfterMount = () => {
            this.props.component = locationChangeDecision.component;
        };

        const onMount = () => {
            onAfterMount();
            this.removeEventListener(WebComponentLifecycleEvent.FLOW, onMount);
        };


        if (this.mounted) {
            onAfterMount();
        } else {
            this.addEventListener(WebComponentLifecycleEvent.FLOW, onMount);
        }
    }

    render() {

        if (this.props.component) {
            return this.props.component;
        }
        // @ts-ignore
        return (<st-error props={{
            errorMessage: "ERROR (RouterOutlet): No component found for route!"
        }} />);
    }
}