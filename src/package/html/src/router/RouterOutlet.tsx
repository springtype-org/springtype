import {WebComponent, WebComponentLifecycle} from "../..";
import {Component} from "../../../di";
import {Router} from "./Router";
import {WebComponentReflector} from "../decorator/WebComponentReflector";

export interface RouterState {
    mounted?: boolean;
}

@WebComponent({
    tag: 'router-outlet'
})
@Component
export class RouterOutlet extends HTMLElement implements WebComponentLifecycle {

    state: RouterState = {};

    currentComponent!: Element;

    constructor(router: Router) {
        super();

        router.registerRouterOutlet(this);

        router.enable();
    }

    mount() {
        this.state.mounted = true;
    }

    present(component: HTMLElement): void {

        if (this.currentComponent) {
            this.removeChild(this.currentComponent);
        }

        this.currentComponent = document.createElement(WebComponentReflector.getTagName(component));

        // only if already mounted
        if (this.state.mounted) {
            this.appendChild(this.currentComponent);
        }
    }

    render() {

        if (this.currentComponent) {
            return this.currentComponent;
        }
        return (<strong>ERROR (RouterOutlet): No component found for route!</strong>);
    }
}