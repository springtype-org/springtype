import { IVirtualNode } from "../../vdom/interface/IVirtualNode";

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
	reload(): void;
	refresh(): void;
	tokenizeRoute(route: string, registration?: boolean): Array<string>;
	getComponent(
		cmpOrDef: IRouteDefinition | IVirtualNode | any
	): {
		params: any;
		element: IVirtualNode;
	};
	match(realRoute: string): ILocationChangeDecision | null;
	setParams(params: any): void;
	decideOnLocationChange(hash: string): Promise<void>;
}

export interface IRoutes {
	[route: string]: IRouteDefinition | IVirtualNode | any;
}
export interface ITokenizedRoutes {
	[route: string]: Array<string>; // path tokens
}

export interface IRouteDefinition {
	element: IVirtualNode | any;
	guard?: (
		locationChangeDecision?: ILocationChangeDecision
	) => Promise<boolean>;
	params?: Object;
}

export interface ILocationChangeDecision {
	guard?: (
		locationChangeDecision?: ILocationChangeDecision
	) => Promise<boolean>;
	element: IVirtualNode;
	params: Object;
	route: string;
}
