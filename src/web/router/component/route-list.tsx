import { st } from "../../../core";
import { component } from "../../component";
import { ILifecycle } from "../../component/interface";
import { IRoute } from "../interface/iroute";
import { IRouteList } from "../interface/iroute-list";

@component()
export class RouteList extends st.component implements ILifecycle, IRouteList {
  protected routesToConsider: Array<IRoute> = [];

  registerRoute(route: IRoute) {
    this.routesToConsider.push(route);
  }

  render() {
    // here we take the outside world input like a list of <Route /> and render it
    // .default is made up with all contents that are not wrapped inside a <template>
    return this.renderChildren();
  }

  // <Route /> are all created here, now lets register them
  onAfterRender() {
    // console.log("before render all routes to consider registered", this.routesToConsider);

    for (let route of this.routesToConsider) {
      // register this routes path to match
      st.router.registerPaths(route.path, route);
    }

    // make sure, router is enabled
    st.router.enable();
  }
}


declare global {
  namespace JSX {
    interface IntrinsicElements {
      RouteList: Partial<RouteList>;
    }
  }
}
