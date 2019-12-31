import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface";
import * as layerStyles from "./layers.tss.scss";
import { IVirtualChild, IVirtualNode } from "../../../../../src/web/vdom/interface/ivirtual-node";

@component
export class Layers extends st.component implements ILifecycle {

  class = layerStyles.layers;

  renderChildren() {

    const children: Array<IVirtualNode> = super.renderChildren() as Array<IVirtualNode>;

    for (let i=0; i<children.length; i++) {

      const childNode = children[i];

      if (!childNode.attributes.style) {
        childNode.attributes.style = {};
      }
      childNode.attributes.style.zIndex = i;
      childNode.attributes.style.display = 'block';
      childNode.attributes.style.position = 'absolute';
      childNode.attributes.style.left = 0;
      childNode.attributes.style.top = 0;
      childNode.attributes.style.width = "100%";
      childNode.attributes.style.height = "100%";
    }
    return children;
  }

  render() {
    return this.renderChildren();
  }
}
