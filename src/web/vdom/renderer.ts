import { st } from "../../core/st";
import { IElement, IVirtualNode } from "./interface";

if (!st.renderer) {

  st.renderer = {

    render: (
      virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>,
      parentDomElement: IElement,
    ): Array<IElement | Text | undefined> | IElement | Text | undefined => {

      if (typeof virtualNode == 'string') {
        return st.dom.createTextNode(virtualNode, parentDomElement);
      }
      return st.dom.createElementOrElements(virtualNode, parentDomElement);
    },
  }

  if (!st.render) {
    // add render method for awaiting / initial rendering
    st.render = async (virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>, domNode: Element = document.body) => {

      // wait for the DOM to become ready, then render (prevents errors if a novice calls st.render() before <body> exists)
      await st.dom.isReady();

      // render root element
      st.renderer.render(virtualNode, domNode as IElement);

      if (st.router) {

        // all <Route>'s and <RouteList>'s are instantiated by now,
        // start rendering routes; method checks internally if already enabled.
        st.router.enable();
      }

      // standard style for .st-hide to work (st.hide(domElement), st.show(domElement))
      st.style('st-hide', `[st-hide] { display: none; }`);
    };
  }
}

