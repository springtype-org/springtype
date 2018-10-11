import {WebModuleRoutes} from "../router/Router";
import {ApplicationContext} from "../../../di";
// import RouterOutlet web component
import '../router/RouterOutlet';
import {DefaultWebApp, IWebApp} from "./WebApp";

export interface WebModuleConfig {
    routes: WebModuleRoutes,
    app?: IWebApp<any>
}

export interface IWebModule<WC> extends Function {
    new(...args: any[]): WC;
}

export function WebModule<WM extends IWebModule<any>>(config: WebModuleConfig): any {

    // apply defaults
    if (!config.app) {
        config.app = ApplicationContext.getInstance().getBean(DefaultWebApp)
    }

    const webAppConfig = ApplicationContext.getInstance().getWebAppConfig();

    if (webAppConfig.router && config.routes) {

        // register routes within application router
        webAppConfig.router.registerRoutes(config.routes);
    }

    return (target: WM) => {
        return target;
    }
}