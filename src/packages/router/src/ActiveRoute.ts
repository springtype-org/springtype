import {Component} from "@springtype/springtype-incubator-core";
import {RouterImpl} from "./interface/RouterImpl";
import {Routes} from "./interface/Routes";
import {getRouter} from "./context/router";

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

    getPath(): string {
        return this.routerImpl.getPath();
    }

    reload() {
        return this.routerImpl.reload();
    }

    refresh() {
        this.routerImpl.refresh();
    }

    navigate(path: string, params: any): void {
        return this.routerImpl.navigate(path, params);
    }

    registerRoutes(routes: Routes): void {
        return this.routerImpl.registerRoutes(routes);
    }
}