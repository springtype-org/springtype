import {Router, WebModuleRoutes} from "../router/Router";
import {ApplicationContext} from "../../../di";

// import RouterOutlet web component
import '../router/RouterOutlet';

export interface WebModuleConfig {
    routes: WebModuleRoutes
}

export interface IWebModule<WC> extends Function {
    new(...args: any[]): WC;
}

export function WebModule<WM extends IWebModule<any>>(config: WebModuleConfig): any {

    const router = ApplicationContext.getInstance().getBean(Router);

    router.registerRoutes(config.routes);

    return (target: WM) => {

        return target;
    }
}