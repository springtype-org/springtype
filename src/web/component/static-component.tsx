import {Component} from "./component";
import {ILifecycle} from "./interface";
import {st} from "../../core";

export class StaticComponent<A = {}> extends Component<A> implements ILifecycle {

    shouldRender() {
        return !this.INTERNAL.notInitialRender;
    }

}

if (!st.staticComponent) {
    st.staticComponent = StaticComponent;
}
