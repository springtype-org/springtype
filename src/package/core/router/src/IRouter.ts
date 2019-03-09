import {RouterOutlet} from "./RouterOutlet";
import {IReactCreateElement} from "../../renderer/src/TSXRenderer";
import {IComponent} from "../../di";
import {WebComponentLifecycle} from "../../index";

export const ROUTE_NOT_FOUND = '*';

export interface WebModuleRouteDefinition {
    component: IReactCreateElement|IComponent<any>;
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    params?: Object;
}

export interface WebModuleRoutes {
    [route: string]: WebModuleRouteDefinition|IReactCreateElement|IComponent<any>;
}

export interface TokenizedWebModuleRoutes {
    [route: string]: Array<string>; // path tokens
}

export interface LocationChangeDecision {
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    component: IReactCreateElement;
    params: Object;
    route: string;
}

export interface IRouter {
    getParams(): any;
    registerRoutes(routes: WebModuleRoutes): void;
    onLocationChange(): Promise<void>;
    disable(): void;
    enable(): void;
    navigate(path: string, params: any): void;
    registerRouterOutlet(routerOutlet: RouterOutlet): void;
}
