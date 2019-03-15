import {
    Attribute,
    UseComponent,
    VirtualElement,
    WebComponent,
    WebComponentLifecycle
} from "@springtype/springtype-incubator-core";
import {Logo} from "../logo/Logo";

@WebComponent('app-layout')
@UseComponent(Logo)
export class AppLayout extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    items: VirtualElement|Array<VirtualElement>;

    render() {
        return <div>
            <div style="text-align: center;">
                <app-logo />
            </div>
            { this.items }
        </div>;
    }
}