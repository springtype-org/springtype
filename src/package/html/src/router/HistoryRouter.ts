import {ApplicationContext, Component} from "../../../di";
import {RouterOutlet} from "./RouterOutlet";
import {
    IRouter,
    LocationChangeDecision,
    TokenizedWebModuleRoutes,
    WebModuleRouteDefinition,
    WebModuleRoutes
} from "./IRouter";
import {WebAppConfig} from "../decorator/WebApp";
import {IReactCreateElement} from "../ui/TSXRenderer";

@Component
export class HistoryRouter implements IRouter {

    protected TOKENIZED_ROUTES: TokenizedWebModuleRoutes = {};
    protected ROUTE_MAP: WebModuleRoutes = {};
    protected CURRENT_PARAMS: any = {};

    // might be unset until someone puts a <router-outlet>
    protected ROUTER_OUTLET!: RouterOutlet;

    protected setParams(params: any): void {
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

    protected tokenizeRoute(route: string, registration: boolean = false): Array<string> {

        const tokenizedRoute = route.split('/');

        if (registration && route[0] === '/') {
            tokenizedRoute[0] = '#';
        }

        if (tokenizedRoute[0] !== '#') {
            tokenizedRoute.unshift('#');
        }
        return tokenizedRoute;
    }

    protected match(realRoute: string): LocationChangeDecision|null {

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

                    const cmpOrDef: WebModuleRouteDefinition | IReactCreateElement = this.ROUTE_MAP[route];

                    const component = (cmpOrDef as WebModuleRouteDefinition).component ?
                        (cmpOrDef as WebModuleRouteDefinition).component :
                        (cmpOrDef as IReactCreateElement);

                    const defInitialParams = (cmpOrDef as WebModuleRouteDefinition).params || {};

                    return {
                        ...cmpOrDef,
                        params: {
                            ...defInitialParams,
                            ...params,
                        },
                        component,
                        route
                    } as LocationChangeDecision;
                }
            }
        }
        return null;
    }

    protected async decideOnLocationChange(hash: string): Promise<void> {

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
                    this.ROUTER_OUTLET.present(decision);
                }
            }

        } else {
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

    navigate(path: string, params: any) {

        let route = path;

        for (let param in params) {

            if (params.hasOwnProperty(param)) {
                route = route.replace(':' + param, params[param]);
            }
        }
        window.location.href = '#' + route;
    }
}