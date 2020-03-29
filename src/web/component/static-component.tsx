import {Component} from "./component";
import {ILifecycle} from "./interface";
import {st} from "../../core";
import {RenderReason} from "./interface/irender-reason";

export class StaticComponent<A = {}> extends Component<A> implements ILifecycle {

    shouldRender(reason: RenderReason): boolean {
         return !this.INTERNAL.notInitialRender;
    }

}

if (!st.staticComponent) {
    st.staticComponent = StaticComponent;
}
