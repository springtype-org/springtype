import { st } from "../../core";
import { TAG_NAME } from "../customelement/CustomElementManager";
import { tsx } from "../vdom";
import { IVirtualNode } from "../vdom/interface/IVirtualNode";
import {
	ILocationChangeDecision,
	IRouteDefinition,
	IRouter,
	IRoutes,
	ITokenizedRoutes
} from "./interface/IRouter";
import { RouterOutlet } from "./RouterOutlet";

export const ROUTE_NOT_FOUND = "*404*";
export const ROUTE_BASE = "";

export class Router implements IRouter {
	static init() {
		if (!st.router) {
			st.router = new Router();
		}
	}

	TOKENIZED_ROUTES: ITokenizedRoutes = {};
	ROUTE_MAP: IRoutes = {};
	CURRENT_PARAMS: any = {};
	CURRENT_PATH: string = "";
	CURRENT_DECISION: any;

	// might be unset until someone puts a <router-outlet>
	ROUTER_OUTLET!: RouterOutlet;

	setParams(params: any): void {
		st.router.CURRENT_PARAMS = params;
	}

	getParams(): any {
		return st.router.CURRENT_PARAMS;
	}

	getPath(): string {
		return st.router.CURRENT_PATH;
	}

	reload() {
		st.router.navigate(st.router.getPath(), st.router.getParams());
	}

	refresh() {
		st.router.ROUTER_OUTLET.refresh();
	}

	registerRoutes(routes: IRoutes): void {
		for (let route in routes) {
			st.router.TOKENIZED_ROUTES[route] = st.router.tokenizeRoute(route, true);
		}
		st.router.ROUTE_MAP = {
			...st.router.ROUTE_MAP,
			...routes
		};
	}

	tokenizeRoute(route: string, registration: boolean = false): Array<string> {
		const tokenizedRoute = route.split("/");

		if (registration && route[0] === "/") {
			tokenizedRoute[0] = "#";
		}

		if (tokenizedRoute[0] !== "#") {
			tokenizedRoute.unshift("#");
		}
		return tokenizedRoute;
	}

	match(realRoute: string): ILocationChangeDecision | null {
		const tokenizedRoute = st.router.tokenizeRoute(realRoute);

		const params: {
			[key: string]: string;
		} = {};

		for (let route in st.router.TOKENIZED_ROUTES) {
			const tokenizedRouteCandidate = st.router.TOKENIZED_ROUTES[route];

			let routeMatches = true;

			for (let i = 0; i < tokenizedRouteCandidate.length; i++) {
				const token = tokenizedRouteCandidate[i];

				if (token.startsWith(":")) {
					params[token.replace(":", "")] = tokenizedRoute[i];
				} else {
					if (token !== tokenizedRoute[i]) {
						routeMatches = false;
						break; // stop looping further, path doesn't match
					}
				}
			}

			if (routeMatches) {
				const resolvedComponentAndParams = st.router.getComponent(
					st.router.ROUTE_MAP[route]
				);

				return {
					params: {
						...resolvedComponentAndParams.params,
						...params
					},
					element: resolvedComponentAndParams.element,
					route
				} as ILocationChangeDecision;
			}
		}

		if (st.router.ROUTE_MAP[ROUTE_NOT_FOUND]) {
			const resolvedComponentAndParams = st.router.getComponent(
				st.router.ROUTE_MAP[ROUTE_NOT_FOUND]
			);

			return {
				route: ROUTE_NOT_FOUND,
				element: resolvedComponentAndParams.element,
				params: resolvedComponentAndParams.params
			} as ILocationChangeDecision;
		} else {
			return {
				route: ROUTE_NOT_FOUND,
				element: (
					<div>{`No Web Component found for rendering this route. Please specify a route for: ${realRoute.replace(
						"#",
						""
					)} or: ${ROUTE_NOT_FOUND}`}</div>
				),
				params: {}
			} as ILocationChangeDecision;
		}
	}

	getComponent(
		cmpOrDef: IRouteDefinition | IVirtualNode | any
	): {
		params: any;
		element: IVirtualNode;
	} {
		let element: any = (cmpOrDef as IRouteDefinition).element
			? (cmpOrDef as IRouteDefinition).element
			: (cmpOrDef as IVirtualNode);

		if (element[TAG_NAME]) {
			element = {
				type: element[TAG_NAME],
				attributes: [],
				children: []
			} as IVirtualNode;
		}

		const params = (cmpOrDef as IRouteDefinition).params || {};

		return {
			element,
			params
		};
	}

	async decideOnLocationChange(hash: string): Promise<void> {
		const decision = (st.router.CURRENT_DECISION = st.router.match(hash));

		if (decision !== null) {
			if (!st.router.ROUTER_OUTLET) {
				throw new Error(
					"You must place a <router-outlet /> somewhere in your HTML."
				);
			} else {
				// set active route params
				st.router.setParams(decision.params);

				let isAllowedToPresent = true;

				if (decision.guard && typeof decision.guard === "function") {
					isAllowedToPresent = await decision.guard(decision);
				}

				if (isAllowedToPresent) {
					st.router.ROUTER_OUTLET.present(decision);
				}
			}
		} else {
			throw new Error(
				`No route registered for hash url: '${hash}'. Add this route to an @WebModule({ route: { ... } })!`
			);
		}
	}

	disable(): void {
		// numb callback
		window.onpopstate = () => {};
	}

	async onLocationChange(): Promise<void> {
		await st.router.decideOnLocationChange(window.location.hash);
	}

	async enable(): Promise<void> {
		// register callback
		window.onpopstate = async () => {
			await st.router.onLocationChange();
		};

		// initial call for base URL
		await st.router.onLocationChange();
	}

	registerRouterOutlet(routerOutlet: RouterOutlet) {
		st.router.ROUTER_OUTLET = routerOutlet;
	}

	navigate(pathOrCustomElement: string, params?: any) {
		let route = pathOrCustomElement;

		for (let param in params) {
			if (params.hasOwnProperty(param)) {
				route = route.replace(":" + param, params[param]);
			}
		}
		st.router.CURRENT_PATH = "#" + route;
		window.location.href = st.router.CURRENT_PATH;
	}
}
Router.init();
