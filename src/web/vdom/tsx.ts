import { st } from "../../core";
import { GlobalCache } from "../../core/st/interface/i$st";
import {
  ISlotChildren,
  IVirtualChild,
  IVirtualChildren,
  IVirtualNode,
  IVirtualNodeType,
} from "./interface/ivirtual-node";
import { UNWRAP_ATTRIBUTE_NAME, SLOT_ATTRIBUTE_NAME } from "./interface/iattributes";
import { TYPE_FUNCTION } from "../../core/lang/type-function";
import { TYPE_OBJECT } from "../../core/lang/type-object";
import { TYPE_UNDEFINED } from "../../core/lang/type-undefined";

export const TEMPLATE_ELEMENT_NAME = "template";
export const DEFAULT_SLOT_NAME = "default";
export const FRAGMENT_ELEMENT_NAME = "fragment";
export const CLASS_ATTRIBUTE_NAME = "class";
export const CLASS_NAME_ATTRIBUTE_NAME = "className";
export const XLINK_ATTRIBUTE_NAME = "xlink";

export const tsxToStandardAttributeName = (tsxAttributeName: string): string => {
  // support for SVG xlink:*
  if (tsxAttributeName.startsWith(XLINK_ATTRIBUTE_NAME)) {
    return XLINK_ATTRIBUTE_NAME + ":" + tsxAttributeName.replace(XLINK_ATTRIBUTE_NAME, "").toLowerCase();
  }

  switch (tsxAttributeName) {
    // support for React className -> class
    case CLASS_NAME_ATTRIBUTE_NAME:
      return CLASS_ATTRIBUTE_NAME;
  }
  return tsxAttributeName;
};

// If a JSX comment is written, it looks like: { /* this */ }
// Therefore, it turns into: {}, which is detected here
export const isJSXComment = (node: IVirtualNode): boolean => {
  return node && typeof node === TYPE_OBJECT && (!node.attributes && !node.type && !node.children);
};

// Implementation to flatten virtual node children structures like:
// [<p>1</p>, [<p>2</p>,<p>3</p>]] to: [<p>1</p>,<p>2</p>,<p>3</p>]
export const toFlatNodeList = (children: Array<IVirtualChild>): Array<IVirtualChild> => {
  return ([] as Array<IVirtualChildren>).concat.apply([], children as any) as Array<IVirtualChildren>;
};

// Filters comments and undefines like: [undefined, 'a', 'b', false, {}] to: ['a', 'b', false]
export const filterCommentsAndUndefines = (children: Array<IVirtualNode> | Array<IVirtualChild>) => {
  return children.filter(
    (child: IVirtualChild) => typeof child !== TYPE_UNDEFINED && !isJSXComment(child as IVirtualNode),
  );
};

export let cmpSequence = 0;

export const newUniqueComponentName = () => "cmp-" + ++cmpSequence;

export const knownComponentsMap: WeakMap<Function, string> = new WeakMap();

export const tsx = (st.tsx = (
  // if it is a function, it is a component
  type: IVirtualNodeType | Function,
  attributes: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any> | null,
  ...children: Array<IVirtualChildren> | IVirtualChildren
): Array<IVirtualNode> | IVirtualNode | undefined => {
  children = filterCommentsAndUndefines(toFlatNodeList(children));

  // clone attributes as well
  attributes = { ...attributes };

  // effectively unwrap by directly returning the children
  if (type === FRAGMENT_ELEMENT_NAME || attributes[UNWRAP_ATTRIBUTE_NAME]) {
    return filterCommentsAndUndefines(children) as Array<IVirtualNode>;
  }

  const slotChildren: ISlotChildren = {};

  // it's a component, divide and conquer children
  if (typeof type === TYPE_FUNCTION) {
    const fn = type;
    type = (type as Function).name;

    if (process.env.NODE_ENV === "development") {

      // assign debug flag
      attributes.__className = type;
    }

    // generate name in case of class name obfuscation or functional components
    if (!knownComponentsMap.has(fn as Function)) {
      if (!type || type.startsWith(CLASS_ATTRIBUTE_NAME)) {
        type = newUniqueComponentName();
      }
      knownComponentsMap.set(fn as Function, type);
      // assign global component by type reference
      st[GlobalCache.COMPONENT_REGISTRY][type] = fn as any;
    } else if (!type) {
      // @ts-ignore
      type = knownComponentsMap.get(fn);
    }

    // <template> elements are to be moved inside slotChildren
    for (let i = 0; i < children.length; i++) {
      // --- <template> discovery and divide & conquer algorithm to find named and default children
      if (children[i] && ((children[i] as unknown) as IVirtualNode).type === TEMPLATE_ELEMENT_NAME) {
        //templateTagFound = true;
        // last one wins if the same name occurs more than once
        slotChildren[((children[i] as unknown) as IVirtualNode).attributes[SLOT_ATTRIBUTE_NAME]] = (children[
          i
        ] as unknown) as IVirtualNode;
      } else {
        // stack
        if (!slotChildren[DEFAULT_SLOT_NAME]) {
          slotChildren[DEFAULT_SLOT_NAME] = [];
        }
        (slotChildren[DEFAULT_SLOT_NAME] as Array<IVirtualNode>).push((children[i] as unknown) as IVirtualNode);
      }
    }
    // <template> behaviour: disable direct 1:1 inject; children stored in slotChildren are rendered
    // via this.renderChildren() and this.renderSlot(...) respectively in components
    children = [];
  }

  // @ts-ignore
  return {
    type,
    attributes,
    children,
    slotChildren,
  };
});
