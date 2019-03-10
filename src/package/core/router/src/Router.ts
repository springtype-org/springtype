import {Component} from "../../index";
import {RouterImpl} from "./interface/RouterImpl";
import {RouterOutlet} from "./RouterOutlet";
import {getAppRouter} from "./function/getAppRouter";
import {Routes} from "./interface/Routes";

@Component
export class Router implements RouterImpl {

    protected _appRouter!: RouterImpl;

    get appRouter(): RouterImpl {

        if (this._appRouter) return this._appRouter;

        const appRouter = getAppRouter();

        if (appRouter) {
            this._appRouter = appRouter;
        }
        return this._appRouter;
    }


    disable(): void {
        return this.appRouter.disable();
    }

    enable(): void {
        return this.appRouter.enable();
    }

    // TODO: getParamNumeric(paramName: string)
    getParams(): any {
        return this.appRouter.getParams();
    }

    navigate(path: string, params: any): void {
        return this.appRouter.navigate(path, params);
    }

    onLocationChange(): Promise<void> {
        return this.appRouter.onLocationChange();
    }

    registerRouterOutlet(routerOutlet: RouterOutlet): void {
        return this.appRouter.registerRouterOutlet(routerOutlet);
    }

    registerRoutes(routes: Routes): void {
        return this.appRouter.registerRoutes(routes);
    }
}