import { st } from "../st/st";
import { IElement } from "./interface/ielement";
import { IVirtualNode } from "./interface/ivirtual-node";

export const render = st.render = (
  virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>,
  parentDomElement?: IElement,
): Array<IElement | Text | undefined> | IElement | Text | undefined => {

  if (typeof virtualNode == 'string') {
    return st.dom.createTextNode(virtualNode, parentDomElement);
  }
  return st.dom.createElementOrElements(virtualNode, parentDomElement);
}

export const renderOnReady = async (virtualNode: IVirtualNode | undefined | string | Array<IVirtualNode | undefined | string>, domNode?: Element) => {

    const document = st.domImpl!.document!;

    // wait for the DOM to become ready, then render (prevents errors if a novice calls st.render() before <body> exists)
    await st.dom.isReady();

    // render root element
    return render(virtualNode, domNode as IElement || document.body);
};