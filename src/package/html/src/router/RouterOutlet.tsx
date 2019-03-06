import {WebComponent, WebComponentLifecycle} from "../..";
import {WebComponentReflector} from "../decorator/WebComponentReflector";
import {Router} from "./Router";
import {IReactCreateElement} from "../ui/TSXRenderer";
import {LocationChangeDecision, WebModuleRouteDefinition} from "./IRouter";
import {ApplicationContext} from "../../../di";
import {WebAppConfig} from "../decorator/WebApp";
import {WebComponentLifecycleEvent} from "../decorator/WebComponent";

import "../component/ErrorComponent";

interface RouterProps {
    component: IReactCreateElement;
    id: number;
}

@WebComponent({
    tag: 'router-outlet'
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
        return (<st-error props={{
            errorMessage: "ERROR (RouterOutlet): No component found for route!"
        }} />);
    }
}