import { IElement } from "../../vdom/interface";
import { IVirtualChild, IVirtualNode } from "../../vdom/interface/ivirtual-node";
import { AttrType } from '../trait/attr';
import { RenderReason, RenderReasonMetaData } from './irender-reason';

export interface ILifecycle {

  // the root HTML/SVG element mounted to a virtual component
  el?: HTMLElement;

  // can be assigned to set one or more attributes on this.el
  elAttributes?: Partial<JSX.HTMLAttributes>;

  // can be assinged to set one or more CSS classes on this.el.class (className) mutation
  elClass?: string|Array<string>;

  // can be assinged to set one or more styles: this.el.style mutation
  elStyle?: Partial<CSSStyleDeclaration>;

  // the parent components HTML/SVG root element
  parentEl?: HTMLElement;

  // the parent component
  parent?: ILifecycle;

  // gives access to the virtualNode of the element
  // in onBeforeElCreate() this object can be mutated
  // { attributes: IVirtualNodeAttributes, slotChildren: ISlotChildren, children: IChildNodes }
  virtualNode?: IVirtualNode;

  // allows to filer/transform the virtual node (and it's children and slotChildren)
  // before it's created and assigned as this.el
  onBeforeElCreate?(virtualNode: IVirtualNode): void;

  // allows to tap / mutate this.el after creation
  onAfterElCreate?(el: IElement): void;

  // is called before the .el of the component is patches by the VDOM
  onBeforePatchEl?(): void;

  // is called after the .el of the component has been patched by the VDOM
  onAfterPatchEl?(): void;

  // is called when a re-rendering of the VDOM triggers an outer change
  // of an attribute which is a standard HTML attribute such as: id, class, style, tabindex
  // because these attributes are not patches by the VDOM the component has
  // to decide what to do now: It might have been a MERGE or REPLACE intention

  // !!!TODO!!!: Always use REPLACE -> outer changes are intentionally OVERRIDES !!!
  // Remove this lifecylce method and it's impl.
  handleUpdateElAttribute?(name: string, value: any): void;

  // before this.el.childNodes are created
  onBeforeElChildrenCreate(): void;

  // after this.el.childNodes have been created
  onAfterElChildrenCreate(): void;

  // before the component gets mounted to the DOM
  onBeforeConnect?(): void;

  // after the component gets mounted to the DOM
  onConnect?(): void | boolean;

  // after an attribute got set
  onAttributeChange?(name: string, value: any, prevValue: any): void;

  // before render(). Return false to skip render
  shouldRender?(reason: RenderReason, meta?: RenderReasonMetaData): boolean;

  // before render()
  onBeforeRender?(): void;

  // after render()
  onAfterRender?(hasDOMChanged: boolean): void;

  // after first render()
  onAfterInitialRender?(): void;

  // implement this and return TSX to be rendered
  render?(): IVirtualNode|Array<IVirtualNode>;

  // lifecycle method to trigger a VDOM tpl reflow
  doRender?(): Promise<void>;

  // after the component has been unmounted from the DOM
  onDisconnect?(): void;

  // before attribute changes get accepted
  shouldAttributeChange(name: string, value: any, prevValue: any): boolean;

  // set an attribute and follow the @attr behaviour (e.g. DOM_INTRANSPARENT)
  setAttribute(name: string, value: any, type?: AttrType): void;

  // returns the virtual children assigned via <template name={name}> from the outside if provided
  // or the defaults if provided or <fragement />
  renderSlot?(name: string, defaults?: IVirtualChild | Array<IVirtualChild>): IVirtualChild | Array<IVirtualChild>;

  // returns the children not assigned via <template name={name}> from the outside if provided
  // or the defaults if provided or <fragement />
  renderChildren?(defaults?: IVirtualChild | Array<IVirtualChild>): IVirtualChild | Array<IVirtualChild>;
}

export interface IComponentLifecycle extends ILifecycle {
  connectedCallback(): void;
  disconnectedCallback(): void;
}
