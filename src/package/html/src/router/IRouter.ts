import {RouterOutlet} from "./RouterOutlet";

export interface WebModuleRouteDefinition {
    component: HTMLElement;
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    params?: Object;
}

export interface WebModuleRoutes {
    [route: string]: WebModuleRouteDefinition|HTMLElement|any;
}

export interface TokenizedWebModuleRoutes {
    [route: string]: Array<string>; // path tokens
}

export interface LocationChangeDecision {
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    component: HTMLElement;
    params: Object;
}

export interface IRouter {
    getParams(): any;
    registerRoutes(routes: WebModuleRoutes): void;
    onLocationChange(): Promise<void>;
    disable(): void;
    enable(): void;
    navigate(webComponent: Function, params: any): void;
    registerRouterOutlet(routerOutlet: RouterOutlet): void;
}
