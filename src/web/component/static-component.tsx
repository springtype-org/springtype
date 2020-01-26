import { Component } from "./component";
import { ILifecycle } from "./interface/ilifecycle";
import { st } from "../../core";
import {attr} from "./decorator/attr";
import {AttrType} from "./trait/attr";

export class StaticComponent<A = {}> extends Component<A> implements ILifecycle {

  // prevent re-rendering after the initial render
  // to keep VDOM from syncing the DOM. Thus the component becomes static
  // and external JavaScript libraries can prosper
  @attr(AttrType.DOM_TRANSPARENT)
  novdom: true = true;

}

st.staticComponent = StaticComponent;
