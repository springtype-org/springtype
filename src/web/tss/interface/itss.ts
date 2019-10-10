import { IVirtualNode } from "../../vdom/interface";
import { IAdoptedStyleSheet } from "./iadopted-stylesheet";

export interface ITSS {
  headStyleSheets: any;
  cssStyleSheets: any;
  globalStyles: any;
  addHeadStyleSheets(adoptedStylesheets: Array<IAdoptedStyleSheet>): Promise<void>;
  toCSSStyleSheets(adoptedStylesheets: Array<IAdoptedStyleSheet>): Promise<Array<CSSStyleSheet>>;
  currentTheme: any;

  generateStyleDeclaration(declaration: any, mediaQuery?: boolean): any;

  getDeclaration(instance: any, tssFn?: Function, renderStyleFn?: Function): any;

  renderStyleSheet(instance: any, tssFn?: Function, renderStyleFn?: Function): CSSStyleSheet;

  renderStyleNode(declaration: any): IVirtualNode;

  setTheme(theme: any): void;
}
