import { ICustomHTMLElement } from "../../customelement/interface";
import { IVirtualNode } from "../../vdom/interface/ivirtual-node";

export interface IRouteComponent {
  params: any;
  element: IVirtualNode;
}

export interface IRouter {
  TOKENIZED_ROUTES: ITokenizedRoutes;
  ROUTER_OUTLET: any;
  ROUTE_MAP: IRoutes;
  CURRENT_PARAMS: any;
  CURRENT_PATH: string;
  CURRENT_DECISION: any;
  getParams(): any;
  getPath(): string;
  registerRoutes(routes: IRoutes): void;
  onLocationChange(): Promise<void>;
  disable(): void;
  enable(): void;
  navigate(path: string, params?: any): void;
  registerRouterOutlet(routerOutlet: any): void;
  refresh(): void;
  tokenizeRoute(route: string, registration?: boolean): Array<string>;
  match(realRoute: string): ILocationChangeDecision | null;
  setParams(params: any): void;
  decideOnLocationChange(hash: string): Promise<void>;
}

export interface IRoutes {
  [route: string]: IRouteDefinition | ICustomHTMLElement;
}
export interface ITokenizedRoutes {
  [route: string]: Array<string>; // path tokens
}

export type GuardFunction = (locationChangeDecision?: ILocationChangeDecision) => Promise<boolean>;

export interface IRouteDefinition {
  customElement: ICustomHTMLElement;
  guard?: GuardFunction;
}

export interface ILocationChangeDecision {
  guard?: GuardFunction;
  component: ICustomHTMLElement;
  params: Object;
  route: string;
}
