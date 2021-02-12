import { IVirtualChild, IVirtualChildren, IVirtualNode, IVirtualNodeType } from 'springtype-types';
import { FRAGMENT_ELEMENT_NAME } from './constants';

// If a JSX comment is written, it looks like: { /* this */ }
// Therefore, it turns into: {}, which is detected here
export const isJSXComment = (node: IVirtualNode): boolean =>
  // istanbul ignore next
  node && typeof node === 'object' && !node.attributes && !node.type && !node.children;

// Implementation to flatten virtual node children structures like:
// [<p>1</p>, [<p>2</p>,<p>3</p>]] to: [<p>1</p>,<p>2</p>,<p>3</p>]
export const toFlatNodeList = (children: Array<IVirtualChild>): Array<IVirtualChild> =>
  ([] as Array<IVirtualChildren>).concat.apply([], children as any) as Array<IVirtualChildren>;

// Filters comments and undefines like: ['a', 'b', false, {}] to: ['a', 'b', false]
export const filterComments = (children: Array<IVirtualNode> | Array<IVirtualChild>) =>
  children.filter((child: IVirtualChild) => !isJSXComment(child as IVirtualNode));

export const tsx = (
  // if it is a function, it is a component
  type: IVirtualNodeType | Function | any,
  attributes: (JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any>) | null,
  ...children: Array<IVirtualChildren> | IVirtualChildren
): Array<IVirtualNode> | IVirtualNode => {
  children = filterComments(toFlatNodeList(children));

  // clone attributes as well
  attributes = { ...attributes };

  // effectively unwrap by directly returning the children
  if (type === FRAGMENT_ELEMENT_NAME) {
    return filterComments(children) as Array<IVirtualNode>;
  }

  // it's a component, divide and conquer children
  if (typeof type === 'function') {
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
