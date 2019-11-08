import { ChangeType } from '../../../core/cd/interface/change-type';
import { IVirtualNode } from "../../vdom/interface";
import { AttrType } from '../trait/attr';

export enum RenderReason {
  INITIAL = "INITIAL",
  STATE_CHANGE = "STATE_CHANGE",
  ATTRIBUTE_CHANGE = "ATTRIBUTE_CHANGE",
  THEME_CHANGE = "THEME_CHANGE",
}

export interface RenderReasonMetaData {
  // prop or attribute name
  name: string;
  // only in case of prop and deep change
  path: string;
  // only in case of prop change
  type?: ChangeType;
  // new value
  value: any;
  // previous value
  prevValue: any;
}
export interface ILifecycle {
  // before the component gets mounted to the DOM
  onBeforeConnect?(): void;

  // after the component gets mounted to the DOM
  onConnect?(): void | boolean;

  // after an attribute got set
  onAttributeChange?(name: string, value: any, prevValue: any): void;

  // before render(). Return false to skip render
  shouldRender?(reason: RenderReason, meta?: RenderReasonMetaData): boolean;

  // before render()
  onBeforeRender?(tssOnly?: boolean): void;

  // after render()
  onAfterRender?(tssOnly?: boolean): void;

  // after first render()
  onAfterInitialRender?(): void;

  // implement this and return TSX to be rendered
  render?(): IVirtualNode|Array<IVirtualNode>;

  // lifecycle method to trigger a VDOM tpl reflow
  doRender?(tssOnly?: boolean): Promise<void>;

  // lifecycle method to tigger a VDOM tss
  doRenderStyle?(): Promise<IVirtualNode | undefined>;

  // implement this and return TSS for the markup to be styled
  renderStyle?(theme?: any): string | undefined;

  // prior to removal from the DOM
  onBeforeDisconnect?(): void;

  // after the component has been unmounted from the DOM
  onDisconnect?(): void;

  // returns the root HTML element mounted to a virtual component
  getEl(): HTMLElement;

  setAttribute(name: string, value: any, type?: AttrType): void;

  // before attribute changes get accepted
  shouldAttributeChange(name: string, value: any, prevValue: any): boolean;
}

export interface IComponentLifecycle extends ILifecycle {
  connectedCallback(): void;
  disconnectedCallback(): void;
}
