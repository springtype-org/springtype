import {Router} from "./Router";
import {WebComponent, WebComponentLifecycle, WebComponentLifecycleEvent} from "../../webcomponent";

import "../../webcomponent/src/component/ErrorComponent";
import {LocationChangeDecision} from "./interface/LocationChangeDecision";
import {AppRenderer} from "../../renderer/src/decorator/AppRenderer";
import {VirtualElement} from "../../renderer";

interface RouterProps {
    component: VirtualElement;
    id: number;
}

@AppRenderer({})
@WebComponent({
    tag: 'st-router-outlet'
})
export class RouterOutlet extends HTMLElement implements WebComponentLifecycle {

    mounted!: boolean;

    constructor(public props: RouterProps,
                protected router: Router) {

        super();

        this.router.registerRouterOutlet(this);
        this.router.enable();
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