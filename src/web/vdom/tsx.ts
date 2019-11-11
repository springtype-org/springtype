import { st } from "../../core";
import { GlobalCache } from "../../core/st/interface/i$st";
import { ISlotChildren, IVirtualChild, IVirtualChildren, IVirtualNode, IVirtualNodeType } from "./interface/ivirtual-node";

export const tsxToStandardAttributeName = (tsxAttributeName: string): string => {
  // support for SVG xlink:*
  if (tsxAttributeName.startsWith("xlink")) {
    return "xlink:" + tsxAttributeName.replace("xlink", "").toLowerCase();
  }

  switch (tsxAttributeName) {
    // support for React className -> class
    case "className":
      return "class";
  }
  return tsxAttributeName;
};

// --- <slot> implementation

// transforms virtual node <slot name="abc"> entries by replacing them with their target <template slot="abc"> children
// (in case of named <slot>'s) or with their default children (in case of missing <template> wrapping)
/*
export const transformSlots = (rootNode: IVirtualNode, slots: ISlotChildren): IVirtualNode => {
  const visit = (node: IVirtualNode) => {
    if (!node.type) return node;
    if (!node.children) return node;

    if (rootNode.type === "slot") {
      throw new Error("A <slot> cannot be a top-level element.");
    }

    for (let i = 0; i < node.children.length; i++) {
      if (typeof node.children[i] === "string") continue;
      if (node.children[i] && (node.children[i] as IVirtualNode).type === "slot") {

        console.log('child is a <slot>', node.children[i])

        if ((node.children[i] as IVirtualNode).attributes.name) {
          // named slot
          if (
            slots[(node.children[i] as IVirtualNode).attributes.name] &&
            // @ts-ignore
            slots[(node.children[i] as IVirtualNode).attributes.name].children
          ) {
            // @ts-ignore
            node.children[i] = slots[(node.children[i] as IVirtualNode).attributes.name].children;
          } else {

            // default content of a slot is used but it must unwrap, use children
            // @ts-ignore
            node.children[i] = node.children[i].children;
          }
        } else {
          // default slot
          if (slots && slots["default"]) {
            // replace default <slot> by default children (not <template>'d)
            node.children[i] = slots["default"];
          }
        }
      }

      if (!Array.isArray(node.children[i])) {
        visit((node.children[i] as unknown) as IVirtualNode);
      }
      node.children = toFlatNodeList(node.children);
    }
    return node;
  };

  const transformed = visit(rootNode);
  transformed.children = toFlatNodeList(transformed.children);

  return transformed;
};
*/

// If a JSX comment is written, it looks like: { /* this */ }
// Therefore, it turns into: {}, which is detected here
export const isJSXComment = (node: IVirtualNode): boolean => {
  return node && typeof node === "object" && (!node.attributes && !node.type && !node.children);
};

// Implementation to flatten virtual node children structures like:
// [<p>1</p>, [<p>2</p>,<p>3</p>]] to: [<p>1</p>,<p>2</p>,<p>3</p>]
export const toFlatNodeList = (children: Array<IVirtualChild>): Array<IVirtualChild> => {
  return ([] as Array<IVirtualChildren>).concat.apply([], children as any) as Array<IVirtualChildren>;
};

// Filters comments and undefines like: [undefined, 'a', 'b', false, {}] to: ['a', 'b', false]
export const filterCommentsAndUndefines = (children: Array<IVirtualNode> | Array<IVirtualChild>) => {
  return children.filter((child: IVirtualChild) => typeof child !== "undefined" && !isJSXComment(child as IVirtualNode));
};

export let cmpSequence = 0;

export const newUniqueComponentName = () => "cmp-" + (++cmpSequence);

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
  if (type === "fragment" || attributes.unwrap) {
    return filterCommentsAndUndefines(children) as Array<IVirtualNode>;
  }

  const slotChildren: ISlotChildren = {};

  // it's a component, divide and conquer children
  if (typeof type === "function") {
    const fn = type;
    type = type.name;

    // generate name in case of class name obfuscation or functional components
    if (!knownComponentsMap.has(fn)) {
      if (!type || type.startsWith("class")) {
        type = newUniqueComponentName();
      }
      knownComponentsMap.set(fn, type);
      // assign global component by type reference
      st[GlobalCache.COMPONENT_REGISTRY][type] = fn as any;
    } else if (!type) {
      // @ts-ignore
      type = knownComponentsMap.get(fn);
    }

    // <template> elements are to be moved inside slotChildren
    for (let i = 0; i < children.length; i++) {
      // --- <template> discovery and divide & conquer algorithm to find named and default <slot> children
      if (children[i] && ((children[i] as unknown) as IVirtualNode).type === "template") {
        //templateTagFound = true;
        // last one wins if the same name occurs more than once
        slotChildren[((children[i] as unknown) as IVirtualNode).attributes.slot] = (children[i] as unknown) as IVirtualNode;
      } else {
        // stack
        if (!slotChildren["default"]) {
          slotChildren["default"] = [];
        }
        (slotChildren["default"] as Array<IVirtualNode>).push((children[i] as unknown) as IVirtualNode);
      }
    }
    // <slot> / <template> behaviour: disable direct 1:1 inject and use <slot> transformation (see: transformSlots())
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
