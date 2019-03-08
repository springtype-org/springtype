import {ApplicationContext, Component} from "../../index";
import {IRouter, WebModuleRoutes} from "./IRouter";
import {RouterOutlet} from "./RouterOutlet";

@Component
export class Router implements IRouter {

    protected _appRouter!: IRouter;

    get appRouter(): IRouter {

        if (this._appRouter) return this._appRouter;

        const appRouter = ApplicationContext.getInstance().getWebAppConfig().router;

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

    registerRoutes(routes: WebModuleRoutes): void {
        return this.appRouter.registerRoutes(routes);
    }
}