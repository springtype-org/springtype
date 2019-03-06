import {WebComponentLifecycle, WebComponent} from "../../../../../src/package/html";
import {IReactCreateElement} from "../../../../../src/package/html/src/ui/TSXRenderer";

export interface LayoutProps {
    children: IReactCreateElement|Array<IReactCreateElement>;
}

@WebComponent({
    tag: 'app-layout'
})
export class AppLayout extends HTMLElement implements WebComponentLifecycle {

    constructor(
        public props: LayoutProps
    ) {
        super();
    }

    render() {

        return <div>
            <div style="text-align: center;">
                <app-logo />
            </div>
            { this.props.children }
        </div>;
    }
}