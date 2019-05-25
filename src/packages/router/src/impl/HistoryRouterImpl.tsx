import {
    Component,
    ComponentImpl,
    ErrorMessage,
    UseElement,
    VirtualElement,
    WebComponentReflector,
    ActiveRenderer,
} from "@springtype/core";
import {RouterOutlet} from "../RouterOutlet";
import {RouterImpl} from "../interface/RouterImpl";
import {TokenizedRoutes} from "../interface/TokenizedRoutes";
import {Routes} from "../interface/Routes";
import {RouteDefinition} from "../interface/RouteDefinition";
import {LocationChangeDecision} from "../interface/LocationChangeDecision";
import {ROUTE_NOT_FOUND} from "../constants";

@Component
@UseElement(ErrorMessage)
export class HistoryRouterImpl implements RouterImpl {

    protected TOKENIZED_ROUTES: TokenizedRoutes = {};
    protected ROUTE_MAP: Routes = {};
    protected CURRENT_PARAMS: any = {};
    protected CURRENT_PATH: string;
    protected CURRENT_DECISION: any;

    // might be unset until someone puts a <router-outlet>
    protected ROUTER_OUTLET!: RouterOutlet;

    protected setParams(params: any): void {
        this.CURRENT_PARAMS = params;
    }

    getParams(): any {
        return this.CURRENT_PARAMS;
    }

    getPath(): string {
        return this.CURRENT_PATH;
    }

    reload() {
        this.navigate(this.getPath(), this.getParams());
    }

    refresh() {
        this.ROUTER_OUTLET.refresh();
    }

    registerRoutes(routes: Routes): void {

        for (let route in routes) {
            this.TOKENIZED_ROUTES[route] = this.tokenizeRoute(route, true);
        }
        
        this.ROUTE_MAP = {
            ...this.ROUTE_MAP,
            ...routes
        };
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

            let routeMatches = true;

            for (let i=0; i<tokenizedRouteCandidate.length; i++) {

                const token = tokenizedRouteCandidate[i];

                if (token.startsWith(':')) {

                    params[token.replace(':', '')] = tokenizedRoute[i];

                } else {

                    if (token !== tokenizedRoute[i]) {
                        routeMatches = false;
                        break; // stop looping further, path doesn't match
                    }
                }
            }

            if (routeMatches) {

                const resolvedComponentAndParams = this.getComponent(this.ROUTE_MAP[route]);

                return {
                    params: {
                        ...resolvedComponentAndParams.params,
                        ...params,
                    },
                    element: resolvedComponentAndParams.element,
                    route
                } as LocationChangeDecision;
            }
        }

        if (this.ROUTE_MAP[ROUTE_NOT_FOUND]) {

            const resolvedComponentAndParams = this.getComponent(this.ROUTE_MAP[ROUTE_NOT_FOUND]);

            return {
                route: ROUTE_NOT_FOUND,
                element: resolvedComponentAndParams.element,
                params: resolvedComponentAndParams.params
            } as LocationChangeDecision;
        } else {

            return {
                route: ROUTE_NOT_FOUND,
                element: <st-error-message message={`No Web Component found for rendering this route. Please specify a route for ${realRoute.replace('#', '')} or ROUTE_WILDCARD("${ROUTE_NOT_FOUND}")!`} />,
                params: {}
            } as LocationChangeDecision;
        }
    }

    protected isWebComponentClass(component: any): boolean {
        return !!WebComponentReflector.getTagName(component);
    }

    protected getComponent(cmpOrDef: RouteDefinition | VirtualElement | ComponentImpl<any>): {
        params: any,
        element: VirtualElement
    } {
        let element: any = (cmpOrDef as RouteDefinition).element ?
            (cmpOrDef as RouteDefinition).element :
            (cmpOrDef as VirtualElement);

        if (this.isWebComponentClass(element)) {

            const tagName = WebComponentReflector.getTagName(element as any);

            element = {
                name: tagName,
                attributes: [],
                children: []
            };
        }

        const params = (cmpOrDef as RouteDefinition).params || {};

        return {
            element,
            params
        };
    }

    protected async decideOnLocationChange(hash: string): Promise<void> {

        const decision = this.CURRENT_DECISION = this.match(hash);

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

        this.CURRENT_PATH = '#' + route;

        window.location.href = this.CURRENT_PATH;
    }
}