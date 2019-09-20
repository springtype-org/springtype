import { IVirtualNode } from "../../vdom/interface/IVirtualNode";

export interface IRouter {
	TOKENIZED_ROUTES: TokenizedRoutes;
	ROUTER_OUTLET: any;
	ROUTE_MAP: Routes;
	CURRENT_PARAMS: any;
	CURRENT_PATH: string;
	CURRENT_DECISION: any;
	getParams(): any;
	getPath(): string;
	registerRoutes(routes: Routes): void;
	onLocationChange(): Promise<void>;
	disable(): void;
	enable(): void;
	navigate(path: string, params?: any): void;
	registerRouterOutlet(routerOutlet: any): void;
	reload(): void;
	refresh(): void;
	tokenizeRoute(route: string, registration?: boolean): Array<string>;
	getComponent(
		cmpOrDef: RouteDefinition | IVirtualNode | any
	): {
		params: any;
		element: IVirtualNode;
	};
	match(realRoute: string): LocationChangeDecision | null;
	setParams(params: any): void;
	decideOnLocationChange(hash: string): Promise<void>;
}

export interface Routes {
	[route: string]: RouteDefinition | IVirtualNode | any;
}
export interface TokenizedRoutes {
	[route: string]: Array<string>; // path tokens
}

export interface RouteDefinition {
	element: IVirtualNode | any;
	guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
	params?: Object;
}

export interface LocationChangeDecision {
	guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
	element: IVirtualNode;
	params: Object;
	route: string;
}
