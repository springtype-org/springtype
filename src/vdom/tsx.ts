import { IVirtualChild, IVirtualChildren, IVirtualNode, IVirtualNodeType, Ref } from 'springtype-types';

// If a JSX comment is written, it looks like: { /* this */ }
// Therefore, it turns into: {}, which is detected here
const isJSXComment = (node: IVirtualNode): boolean =>
  // istanbul ignore next
  node && typeof node === 'object' && !node.attributes && !node.type && !node.children;

// Filters comments and undefines like: ['a', 'b', false, {}] to: ['a', 'b', false]
const filterComments = (children: Array<IVirtualNode> | Array<IVirtualChild>) =>
  children.filter((child: IVirtualChild) => !isJSXComment(child as IVirtualNode));

const onUpdateFn = function (this: Ref, callback: Function) {
  this.update = callback as any;
};

export const tsx = (
  // if it is a function, it is a component
  type: IVirtualNodeType | Function | any,
  attributes: (JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any>) | null,
  ...children: Array<IVirtualChildren> | IVirtualChildren
): Array<IVirtualNode> | IVirtualNode => {
  children = filterComments(
    // Implementation to flatten virtual node children structures like:
    // [<p>1</p>, [<p>2</p>,<p>3</p>]] to: [<p>1</p>,<p>2</p>,<p>3</p>]
    ([] as Array<IVirtualChildren>).concat.apply([], children as any) as Array<IVirtualChildren>,
  );

  // clone attributes as well
  attributes = { ...attributes };

  // effectively unwrap by directly returning the children
  if (type === 'fragment') {
    return filterComments(children) as Array<IVirtualNode>;
  }

  // it's a component, divide and conquer children
  if (typeof type === 'function') {
    if (attributes.ref) {
      // references an onUpdate assignment function to be called inside of the functional component
      // to register an "update" function that can be called from the outside (ref.current.update(state?))
      (attributes.ref as Ref)!.onUpdate = onUpdateFn.bind(attributes.ref as Ref) as any;
    }

    return type({
      children,
      ...attributes,
    });
  }

  // @ts-ignore as type allows for Function here, but internally we wouldn't
  // want to deal with Function, only "string". However, in this method it is indeed possible
  return {
    type,
    attributes: attributes as any,
    children,
  };
};
