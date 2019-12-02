import { st } from "../../../core";
import { attr, component } from "../../component";
import { ILifecycle } from "../../component/interface";
import { tsx } from "../../vdom";
import { IVirtualNode, IElement } from "../../vdom/interface";
import { IRouteMatch } from "../interface/iroute-match";
import { RouteGuard } from "../interface/route-guard";
import { RouteList } from "./route-list";
import { TYPE_FUNCTION } from "../../../core/lang/type-function";
import { AttrType } from "../../component/trait/attr";

const defaultLoadingComponent = <p>Loading...</p>;

export interface IRouteAttrs {
  path: string | Array<string>;
  exact?: boolean;
  component?: IVirtualNode | Function;
  loadingComponent?: IVirtualNode;
  guard?: RouteGuard;
  notMatchingComponent?: IVirtualNode;
}

// <Route />
@component
export class Route extends st.component<IRouteAttrs> implements ILifecycle {

  // if array is passed, the "one-of" strategy is used; first match wins
  @attr(AttrType.DOM_TRANSPARENT)
  path: string | Array<string> = "";

  @attr
  exact: boolean = false;

  @attr
  component?: IVirtualNode;

  @attr
  loadingComponent: IVirtualNode = defaultLoadingComponent;

  @attr
  guard?: RouteGuard;

  /**
   * Might be 'flex' or else
   */
  @attr
  displayStyle: string = 'block';

  loadingComponentEl!: IElement | Array<IElement>;
  componentEl!: IElement;
  match!: Function;
  activePath!: string;

  shouldRender() {
    return false;
  }

  onBeforeConnect() {

    this.match = st.router.createMatcher(this.path, this.onMatch, this.onMismatch);

    if (!(this.parent instanceof RouteList)) {
      st.router.addOnLocationChangeHandler(this.match);
    }
  }

  onMatch = (path: string, match: IRouteMatch) => {
    this.enter(match, path);
  }

  onMismatch = (path: string) => {
    this.leave(path);
  }

  onDisconnect() {
    if (!(this.parent instanceof RouteList)) {
      st.router.removeOnLocationChangeHandler(this.match);
    }
  }

  leave = async (path: string) => {

    if (path === this.activePath) {

      this.style = {
        display: 'none'
      };

      if (this.componentEl && this.componentEl.$stComponent && typeof this.componentEl.$stComponent.onRouteLeave == TYPE_FUNCTION) {
        this.componentEl.$stComponent.onRouteLeave(path);
      }
      delete this.activePath;
    }
  };

  prepareLoadingComponent = () => {

    if (this.loadingComponentEl) return;

    this.loadingComponentEl = (st.dom.createElementOrElements(this.loadingComponent, this.el) as Array<IElement>);

    if (Array.isArray(this.loadingComponentEl)) {
      this.loadingComponentEl = this.loadingComponentEl[0]
    }
  };

  prepareComponent = async (match: IRouteMatch) => {

    if (this.componentEl) return;

    // guard function takes precedence
    if (typeof this.guard === TYPE_FUNCTION) {

      this.prepareLoadingComponent();

      // run guard function
      this.component = await this.guard!(match);

    } else {

      // suppport <Route path="about"><AboutPage /></Route> syntax
      this.component = this.component || (this.renderChildren() as Array<IVirtualNode>)[0];

      // allows for <Route>{() => import('foo/bar')}</Route>
      if (typeof this.component === TYPE_FUNCTION) {

        this.prepareLoadingComponent();

        // call closure
        this.component = await (this.component as unknown as Function)();

        // dynamic import case: <Route>{() => import('./page/b') }</Route>
        if ((this.component! as any).default) {

          // must be exported as: export default class Foo extends st.component {} to work well
          const Component = (this.component! as any).default;

          this.component = <Component />;
        }
      }
    }

    //this.el.removeChild(this.loadingComponentEl as IElement);
    this.componentEl = st.dom.createElementOrElements(this.component, this.el, true) as IElement;
  };

  // is called by the router whenever one of this.paths match partially or exactly
  enter = async (match: IRouteMatch, path: string) => {

    // false-positive match when explicit matching is asked for
    if (this.exact && !match.isExact) return;

    this.activePath = path;

    this.style = {
      display: this.displayStyle
    };

    await this.prepareComponent(match);

    const stComponent = this.componentEl.$stComponent;

    if (this.loadingComponentEl) {
      (this.loadingComponentEl as IElement).style.display = 'none';
    }

    if ((this.loadingComponentEl && this.el.childNodes.length === 1) || this.el.childNodes.length === 0) {
      this.el.appendChild(this.componentEl);
    }

    // first render
    if (stComponent && !stComponent.INTERNAL.isConnected) {
      stComponent.connectedCallback();

      // deep link support
      this.matchVertical(stComponent);
    } else if (stComponent) {

      // re-render on route change
      stComponent.doRender();
    }

    if (stComponent && typeof stComponent.onRouteEnter == TYPE_FUNCTION) {
      stComponent.onRouteEnter(path);
    }
  };

  matchVertical(component: ILifecycle) {

    if (!component.childComponents) return;

    for (let childComponent of component.childComponents) {
      if ((childComponent instanceof Route) || (childComponent instanceof RouteList)) {
        childComponent.match();
        this.matchVertical(childComponent);
      }
    }
  }

  render() {
    return <fragment />
  }
}
