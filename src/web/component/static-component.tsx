import {Component} from "./component";
import {ILifecycle} from "./interface";
import {st} from "../../core";
import {IElement} from "../vdom/interface";

export class StaticComponent<A = {}> extends Component<A> implements ILifecycle {

    onAfterElCreate(el: IElement) {
        super.onAfterElCreate(el);
        this.el.setAttribute('novdom','')
    }
}

if (!st.staticComponent) {
    st.staticComponent = StaticComponent;
}
