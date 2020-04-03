import { IElement } from "../../vdom/interface";
import { IVirtualChild, IVirtualNode } from "../../vdom/interface/ivirtual-node";
import { AttrType } from '../trait/attr';

export interface ILifecycle {

  // the root HTML/SVG element mounted to a virtual component
  el?: HTMLElement;

  // the parent component
  parent?: ILifecycle;

  // gives access to the virtualNode of the element
  // in onBeforeElCreate() this object can be mutated
  // { attributes: IVirtualNodeAttributes, slotChildren: ISlotChildren, children: IChildNodes }
  virtualNode?: IVirtualNode;

  // gives access to child components
  childComponents?: Array<ILifecycle>;

  // gives access to the mutation observer used for destructuring
  mutationObserver?: MutationObserver;

  // allows for async/await operations until the initial rendering has happened
  initiallyRendered?(): void;

  // allows to filer/transform the virtual node (and it's children and slotChildren)
  // before it's created and assigned as this.el
  onBeforeElCreate?(virtualNode: IVirtualNode): void;

  // allows to tap / mutate this.el after creation
  onAfterElCreate?(el: IElement): void;

  // is called when a re-rendering of the VDOM triggers an outer change
  // of an attribute which is a standard HTML attribute such as: id, class, style, tabindex
  // because these attributes are not patches by the VDOM the component has
  // to decide what to do now: It might have been a MERGE or REPLACE intention

  // before this.el.childNodes are created
  onBeforeElChildrenCreate(): void;

  // after this.el.childNodes have been created
  onAfterElChildrenCreate(): void;

  // after @ref references change
  onAfterRefChange(refName: string, refValue: any): void;

  // before the component gets mounted to the DOM
  onBeforeConnect?(): void;

  // after the component gets mounted to the DOM
  onConnect?(): void | boolean;

  // after an attribute got set
  onAttributeChange?(name: string, value: any, prevValue: any): void;

  // before render()
  onBeforeRender?(): void;

  // after render()
  onAfterRender?(hasDOMChanged: boolean): void;

  // implement this and return TSX to be rendered
  render?(): IVirtualNode | Array<IVirtualNode> | string;

  // after the component has been unmounted from the DOM
  onDisconnect?(): void;

  // called when DOM router is used and the route matched
  onRouteEnter?(): void;

  // called when DOM router is used and the route doesn't match anymore
  onRouteLeave?(): void;

  // called when DOM router is used and the routes parameters change (like /user/:id from #/user/1 to #/user/2)
  onRouteParamsChanged?(params: any): void;

  // if a store is mounted, this method is called on store change
  onStoreChange?(propName: string, value: any): void;

  // before attribute changes get accepted
  shouldAttributeChange(name: string, value: any, prevValue: any): boolean;

  // receive and filter messages
  onMessage?(topic: string, value: any): void;

  // broadcasts a message for other components to listen to
  sendMessage(topic: string, value: any): void;

  // set an attribute and follow the @attr behaviour (e.g. DOM_INTRANSPARENT)
  setAttribute(name: string, value: any, type?: AttrType): void;

  // returns the virtual children assigned via <template name={name}> from the outside if provided
  // or the defaults if provided or <fragement />
  renderSlot?(name: string, defaults?: IVirtualChild | Array<IVirtualChild>): IVirtualChild | Array<IVirtualChild>;

  // returns the children not assigned via <template name={name}> from the outside if provided
  // or the defaults if provided or <fragement />
  renderChildren?(defaults?: IVirtualChild | Array<IVirtualChild>): IVirtualChild | Array<IVirtualChild>;

  // for internal use
  connectedCallback(): void;
  disconnectedCallback(): void;
}
