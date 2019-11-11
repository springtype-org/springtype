import { st } from "../../../core";
import { attr, component } from "../../component";
import { ILifecycle } from "../../component/interface";
import { AttrType } from "../../component/trait/attr";
import { tsx } from "../../vdom";
import { IVirtualNode } from "../../vdom/interface";
import { IRoute } from "../interface/iroute";
import { IRouteMatch } from "../interface/iroute-match";
import { RouteGuard } from "../interface/route-guard";
import { RouteList } from "./route-list";

const nonMatchingComponent = <div unwrap></div>;
const defaultLoadingComponent = <div unwrap>Loading...</div>;

@component()
export class Route extends st.component implements ILifecycle, IRoute {
  // if array is passed, the "one-of" strategy is used; first match wins
  @attr(AttrType.DOM_INTRANSPARENT)
  path: string | Array<string> = "";

  @attr(AttrType.DOM_INTRANSPARENT)
  exact: boolean = false;

  @attr(AttrType.DOM_INTRANSPARENT)
  component?: IVirtualNode;

  @attr(AttrType.DOM_INTRANSPARENT)
  loadingComponent: IVirtualNode = defaultLoadingComponent;

  @attr(AttrType.DOM_INTRANSPARENT)
  guard?: RouteGuard;

  @attr(AttrType.DOM_INTRANSPARENT)
  notMatchingComponent: IVirtualNode = nonMatchingComponent;

  protected componentToRender?: IVirtualNode;

  onBeforeConnect() {
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

  onLeave = async() => {

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
    if (typeof this.guard === "function") {

      // render loading component first
      await this.doRenderDistinct(this.loadingComponent!);

      // run guard function
      let componentDecision = await this.guard(match);

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

    if (componentDecision !== this.componentToRender || st.router.match.paramsChanged) {
      this.componentToRender = componentDecision;
      await this.doRender();
    }
  }

  render() {
    return this.componentToRender || this.notMatchingComponent;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Route: Partial<Route>;
    }
  }
}
