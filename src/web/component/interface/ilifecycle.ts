import { IVirtualNode } from "../../vdom/interface";
import { ISlotChildren } from "../../vdom/interface/ivirtual-node";
import { AttrType } from '../trait/attr';
import { IVirtualChildren, IVirtualNodeAttributes } from './../../vdom/interface/ivirtual-node';
import { RenderReason, RenderReasonMetaData } from './irender-reason';

export interface ILifecycle {

  // the root HTML/SVG element mounted to a virtual component
  el?: HTMLElement;

  // the parent components HTML/SVG root element
  parentEl?: HTMLElement;

  // the parent component
  parent?: ILifecycle;

  // the map of slot children passed via <template> from outside
  // and meant to be transformed and injected in the <slot>
  // placeholders possibly returned by the render() method
  virtualSlotChildren?: ISlotChildren;

  // the map of attributes meant to be set on the root DOM element (el)
  virtualAttributes?: IVirtualNodeAttributes;

  // the array of children provided from the outside
  // and meant to be rendered and mounted to the root DOM element (el)
  virtualChildren?: IVirtualChildren;

  // before DOM attributes of are set on the root DOM element (el)
  // you can mutate this.virtualAttributes to filter/map them
  onBeforeAttributesSet?(): void;

  // before DOM childNodes are created and mounted to the root DOM element (el)
  // you can mutate this.virtualChildren and this.virtualSlotChildren to filter/map them
  onBeforeChildrenMount?(): void;

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
  onAfterRender?(): void;

  // after first render()
  onAfterInitialRender?(): void;

  // implement this and return TSX to be rendered
  render?(): IVirtualNode|Array<IVirtualNode>;

  // lifecycle method to trigger a VDOM tpl reflow
  doRender?(): Promise<void>;

  // prior to removal from the DOM
  onBeforeDisconnect?(): void;

  // after the component has been unmounted from the DOM
  onDisconnect?(): void;

  setAttribute(name: string, value: any, type?: AttrType): void;

  // before attribute changes get accepted
  shouldAttributeChange(name: string, value: any, prevValue: any): boolean;
}

export interface IComponentLifecycle extends ILifecycle {
  connectedCallback(): void;
  disconnectedCallback(): void;
}
