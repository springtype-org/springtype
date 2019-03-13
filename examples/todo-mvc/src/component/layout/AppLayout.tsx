import {
    UseComponent,
    VirtualElement,
    WebComponent,
    WebComponentLifecycle
} from "@springtype/springtype-incubator-core";
import {Logo} from "../logo/Logo";

export interface LayoutProps {
    children: VirtualElement|Array<VirtualElement>;
}

@WebComponent({
    tag: 'app-layout'
})
@UseComponent(Logo)
export class AppLayout extends HTMLElement implements WebComponentLifecycle {


    constructor(
        public props: LayoutProps,
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