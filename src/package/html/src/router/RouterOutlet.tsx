import {WebComponent, WebComponentLifecycle} from "../..";
import {WebComponentReflector} from "../decorator/WebComponentReflector";
import {Router} from "./Router";
import {IReactCreateElement} from "../ui/TSXRenderer";

export interface RouterState {
    mounted: boolean;
}

@WebComponent({
    tag: 'router-outlet'
})
export class RouterOutlet extends HTMLElement implements WebComponentLifecycle {

    currentComponent!: IReactCreateElement;
    currentNativeComponent!: Element;

    constructor(public state: RouterState,
                protected router: Router) {

        super();

        router.registerRouterOutlet(this);

        router.enable();
    }

    mount() {
        this.state.mounted = true;
    }

    present(component: HTMLElement): void {

        if (this.currentNativeComponent) {

            this.removeChild(this.currentNativeComponent);

            // instruct GC to get rid of the component
            delete this.currentNativeComponent;
            delete this.currentComponent;
        }

        this.currentComponent = {name: WebComponentReflector.getTagName(component), attributes: {}, children: []};
        this.currentNativeComponent =this.createNativeElement(this.currentComponent);
        // only if already mounted
        if (this.state.mounted) {
            this.appendChild(this.currentNativeComponent);
        }
    }

    createNativeElement(reactCreateEl: IReactCreateElement): Element {
        this.currentNativeComponent = (window as any).React.render(reactCreateEl)
        return this.currentNativeComponent;
    };

    render() {
        if (this.currentComponent) {
            return this.currentComponent;
        }
        return (<strong>ERROR (RouterOutlet): No component found for route!</strong>);
    }
}