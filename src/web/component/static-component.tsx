import { Component } from "./component";
import { ILifecycle } from "./interface/ilifecycle";
import { st } from "../../core";

export class StaticComponent<A = {}> extends Component<A> implements ILifecycle {

  // prevent re-rendering after the initial render
  // to keep VDOM from syncing the DOM. Thus the component becomes static
  // and external JavaScript libraries can prosper
  shouldRender() {
    return !this.INTERNAL.notInitialRender;
  }
}

st.staticComponent = StaticComponent;
