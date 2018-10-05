import {IWebComponent} from "../decorator/WebComponent";
import {Component} from "../../../di";
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

interface LocationChangeDecision {
    guard?: (locationChangeDecision?: LocationChangeDecision) => Promise<boolean>;
    component: HTMLElement;
    params: Object;
}

@Component
export class Router {

    private TOKENIZED_ROUTES: TokenizedWebModuleRoutes = {};
    private ROUTE_MAP: WebModuleRoutes = {};
    private CURRENT_PARAMS: any = {};

    // might be unset until someone puts a <router-outlet>
    private ROUTER_OUTLET!: RouterOutlet;

    private setParams(params: any): void {
        this.CURRENT_PARAMS = params;
    }

    getParams(): any {
        return this.CURRENT_PARAMS;
    }

    registerRoutes(routes: WebModuleRoutes): void {

        for (let route in routes) {
            this.TOKENIZED_ROUTES[route] = this.tokenizeRoute(route, true);
        }
        Object.assign(this.ROUTE_MAP, routes);
    }

    tokenizeRoute(route: string, registration: boolean = false): Array<string> {

        const tokenizedRoute = route.split('/');

        if (registration && route[0] === '/') {
            tokenizedRoute[0] = '#';
        }

        if (tokenizedRoute[0] !== '#') {
            tokenizedRoute.unshift('#');
        }
        return tokenizedRoute;
    }

    match(realRoute: string): LocationChangeDecision|null {

        const tokenizedRoute = this.tokenizeRoute(realRoute);

        const params: {
            [key: string]: string
        } = {};

        for (let route in this.TOKENIZED_ROUTES) {

            const tokenizedRouteCandidate = this.TOKENIZED_ROUTES[route];

            // optimization: token length match
            if (tokenizedRouteCandidate.length === tokenizedRoute.length) {

                let routeMatches = true;

                for (let i=0; i<tokenizedRouteCandidate.length; i++) {

                    const token = tokenizedRouteCandidate[i];

                    if (token.startsWith(':')) {

                        params[token.replace(':', '')] = tokenizedRoute[i];

                    } else {

                        if (!token.match(tokenizedRoute[i])) {
                            routeMatches = false;
                            break; // stop looping further, path doesn't match
                        }
                    }
                }

                if (routeMatches) {

                    const cmpOrDef: WebModuleRouteDefinition|HTMLElement = this.ROUTE_MAP[route];

                    if ((<WebModuleRouteDefinition> cmpOrDef).component) {

                        const def = <WebModuleRouteDefinition> cmpOrDef;

                        // apply user specific params on top of initial params set by route config
                        const mergedParams = Object.assign({}, def.params, params);

                        return {
                            guard: def.guard,
                            component: def.component,
                            params: mergedParams
                        };

                    } else {

                        const cmp = <HTMLElement> cmpOrDef;

                        return {
                            component: cmp,
                            params
                        }
                    }
                }
            }
        }
        return null;
    }

    async decideOnLocationChange(hash: string): Promise<void> {

        const decision = this.match(hash);

        if (decision !== null) {

            if (!this.ROUTER_OUTLET) {

                throw new Error('You must place a <router-outlet /> in your HTML.');

            } else {

                // set active route params
                this.setParams(decision.params);

                let isAllowedToPresent = true;

                if (decision.guard && typeof decision.guard === 'function') {
                    isAllowedToPresent = await decision.guard(decision);
                }

                if (isAllowedToPresent) {
                    this.ROUTER_OUTLET.present(<HTMLElement> decision.component);
                }
            }

        } else {

            // TODO: Option to allow for default fallback component on 404

            throw new Error(`No route registered for hash url: '${hash}'. Add this route to an @WebModule({ route: { ... } })!`);
        }
    }

    disable(): void {

        // numb callback
        window.onpopstate = () => {};
    }

    async onLocationChange(): Promise<void> {

        await this.decideOnLocationChange(window.location.hash);
    }

    async enable(): Promise<void> {

        // register callback
        window.onpopstate = async() => {
            await this.onLocationChange();
        };

        // initial call for base URL
        await this.onLocationChange();
    }

    registerRouterOutlet(routerOutlet: RouterOutlet) {

         this.ROUTER_OUTLET = routerOutlet;
    }
}