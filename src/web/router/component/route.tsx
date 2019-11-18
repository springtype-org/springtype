import { st } from "../../../core";
import { attr, component } from "../../component";
import { ILifecycle } from "../../component/interface";
import { tsx } from "../../vdom";
import { IVirtualNode } from "../../vdom/interface";
import { IRoute } from "../interface/iroute";
import { IRouteMatch } from "../interface/iroute-match";
import { RouteGuard } from "../interface/route-guard";
import { RouteList } from "./routelist";
import { TYPE_FUNCTION } from "../../../core/lang/type-function";

const nonMatchingComponent = <div unwrap></div>;
const defaultLoadingComponent = <div unwrap>Loading...</div>;

export interface RouteAttributes {
  path: string | Array<string>;
  exact?: boolean;
  component?: IVirtualNode;
  loadingComponent?: IVirtualNode;
  guard?: RouteGuard;
  notMatchingComponent?: IVirtualNode
}

@component
export class Route extends st.component<RouteAttributes> implements ILifecycle, IRoute {

  // if array is passed, the "one-of" strategy is used; first match wins
  @attr
  path: string | Array<string> = "";

  @attr
  exact: boolean = false;

  @attr
  component?: IVirtualNode;

  @attr
  loadingComponent: IVirtualNode = defaultLoadingComponent;

  @attr
  guard?: RouteGuard;

  @attr
  notMatchingComponent: IVirtualNode = nonMatchingComponent;

  protected componentToRender?: IVirtualNode;

  onBeforeConnect() {

    console.log('route before connect', this.virtualNode)

    // do not soley activate this single <Route /> when it's part of a <RouteList />
    // this is because we need to know all routes before we trigger the location change handling
    if (this.parent instanceof RouteList) {
      (this.parent as RouteList).registerRoute(this);
    } else {
      // register this routes path to match
      st.router.registerPaths(this.path, this);

      // make sure, router is enabled
      st.router.enable();
    }
  }

  onLeave = async () => {
    // TODO: fixme: should leave immediately when async guard is still running
    if (st.router.match!.routes.indexOf(this) === -1) {
      // doesn't match anymore
      await this.doRenderDistinct(this.notMatchingComponent);
    }
  };

  // is called by the router whenever one of this.paths match partially or exactly
  onEnter = async (match: IRouteMatch) => {

    // false-positive match when explicit matching is asked for
    if (this.exact && !match.isExact) return;

    // guard function takes precedence
    if (typeof this.guard === TYPE_FUNCTION) {
      // render loading component first
      await this.doRenderDistinct(this.loadingComponent!);

      // run guard function
      let componentDecision = await this.guard!(match);

      // re-evaluate if the match is still valid after such a long time,
      // user might have changed location

      if (st.router.match!.routes.indexOf(this) === -1) {
        // doesn't match anymore
        componentDecision = this.notMatchingComponent;
      }
      await this.doRenderDistinct(componentDecision);
    } else {
      // just render the component
      await this.doRenderDistinct(this.component!);
    }
  };

  // makes sure the component isn't re-rendered when it already is
  async doRenderDistinct(componentDecision: IVirtualNode) {

    console.log('route doRenderDistinct', componentDecision)
    if (componentDecision !== this.componentToRender || st.router.match.paramsChanged) {
      this.componentToRender = componentDecision;
      await this.doRender();
    }
  }

  render() {
    return this.componentToRender || this.notMatchingComponent;
  }
}
