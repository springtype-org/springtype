import { st } from "../../core";
import { component } from "../component";
import { IComponent, INTERNAL } from "../component/interface/icomponent";
import { ILocationChangeDecision } from "./interface/irouter";

@component()
export class RouterOutlet extends st.component {
  instanceCache: {
    [tagName: string]: Element;
  } = {};

  activeComponent: IComponent | undefined;

  constructor() {
    super();
    st.router.registerRouterOutlet(this);
    st.router.enable();
  }

  refresh() {
    if (this.activeComponent) {
      delete this.instanceCache[this.activeComponent!.name];
    }
    this.updateRootNode();
  }

  onConnect() {
    this.activeComponent = st.router.CURRENT_DECISION.component;
    this.updateRootNode();
  }

  async present(locationChangeDecision: ILocationChangeDecision) {
    if (this[INTERNAL].isConnected) {
      this.activeComponent = locationChangeDecision.component;
      this.updateRootNode();
    }
  }

  protected updateRootNode() {
    if (this.activeComponent) {
      if (this[INTERNAL].root.childNodes.length) {
        this[INTERNAL].root.removeChild(this[INTERNAL].root.childNodes[0]);
      }

      if (!this.instanceCache[this.activeComponent.name]) {
        this.instanceCache[this.activeComponent.name] = st.dom.createElement(
          {
            type: this.activeComponent.name,
            attributes: {},
            children: [],
          },
          this[INTERNAL].root,
        )!;

        this.instanceCache[this.activeComponent.name] = this.instanceCache[this.activeComponent.name]!;

        return this.instanceCache[this.activeComponent.name];
      } else {
        this[INTERNAL].root.appendChild(this.instanceCache[this.activeComponent.name]);
      }
    }
  }

  shouldRender() {
    // should really never render
    // cause children are managed _present() instead
    return false;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      RouterOutlet: Partial<RouterOutlet>;
    }
  }
}
