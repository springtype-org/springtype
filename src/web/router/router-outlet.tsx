import { st } from "../../core";
import { customElement } from "../customelement";
import { ILocationChangeDecision } from "./interface/irouter";

@customElement("router-outlet", {
  shadowMode: "none",
})
export class RouterOutlet extends st.element {
  instanceCache: any = {};

  currentTagName: string = "";

  constructor() {
    super();
    st.router.registerRouterOutlet(this);
    st.router.enable();
  }

  refresh() {
    delete this.instanceCache[this.currentTagName];
    this.updateRootNode();
  }

  onConnect() {
    this.currentTagName = st.router.CURRENT_DECISION.tagName;
    this.updateRootNode();
  }

  async present(locationChangeDecision: ILocationChangeDecision) {
    if (this.isConnected) {
      this.currentTagName = locationChangeDecision.tagName;
      this.updateRootNode();
    }
  }

  protected updateRootNode() {
    if (this.currentTagName) {
      if (this.childNodes.length) {
        this.removeChild(this.childNodes[0]);
      }
      this.appendChild(this.getCachedInstance(this.currentTagName));
    }
  }

  getCachedInstance(tagName: string) {
    if (!this.instanceCache[tagName]) {
      this.instanceCache[tagName] = document.createElement(tagName);
    }
    return this.instanceCache[tagName];
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
      "router-outlet": Partial<RouterOutlet>;
    }
  }
}