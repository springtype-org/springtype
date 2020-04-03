import { st } from "../../../core";
import { component } from "../../component";
import { ILifecycle } from "../../component/interface";
import { Route } from "./route";

// <RouteList> ... </RouteList>
@component
export class RouteList extends st.component implements ILifecycle {

  onAfterRender() {
    st.router.addOnLocationChangeHandler(this.match);
    st.router.addOnAfterCacheGroupChangeHandler(this.cacheGroupChange);

    this.match();
    this.cacheGroupChange();
  }

  render() {
    return this.renderChildren();
  }

  onDisconnect() {
    st.router.removeOnLocationChangeHandler(this.match);
    st.router.removeOnAfterCacheGroupChangeHandler(this.cacheGroupChange);
  }

  match = () => {
    // subsequent match & enter/leave on routes
    if (!this.childComponents) return;

    for (let route of this.childComponents) {
      (route as Route).match();
    }
  };
  cacheGroupChange = () => {
    // subsequent match & enter/leave on routes
    if (!this.childComponents) return;

    for (let route of this.childComponents) {
      (route as Route).cacheGroupFn();
    }
  };
}
