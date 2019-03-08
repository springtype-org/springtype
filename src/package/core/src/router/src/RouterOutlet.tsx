import {Router} from "./Router";
import {IReactCreateElement} from "../../renderer";
import {LocationChangeDecision} from "./IRouter";
import {WebComponentLifecycleEvent, WebComponent, WebComponentLifecycle} from "../../webcomponent";

import "../../webcomponent/src/component/ErrorComponent";

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