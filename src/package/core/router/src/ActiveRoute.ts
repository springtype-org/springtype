import {Component} from "../../index";
import {RouterImpl} from "./interface/RouterImpl";
import {getRouter} from "./function/getRouter";
import {Routes} from "./interface/Routes";

@Component
export class ActiveRoute {

    protected _routerImpl!: RouterImpl;

    get routerImpl(): RouterImpl {

        if (this._routerImpl) return this._routerImpl;

        const appRouter = getRouter();

        if (appRouter) {
            this._routerImpl = appRouter;
        }
        return this._routerImpl;
    }

    // TODO: getParamNumeric(paramName: string)
    getParams(): any {
        return this.routerImpl.getParams();
    }

    navigate(path: string, params: any): void {
        return this.routerImpl.navigate(path, params);
    }

    registerRoutes(routes: Routes): void {
        return this.routerImpl.registerRoutes(routes);
    }
}