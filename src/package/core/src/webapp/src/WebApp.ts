import {IRenderer, TSXRenderer} from "../../renderer";
import {ApplicationContext, Component, ConsoleLogger, IComponent, ILogger, StateManager} from "../../index";
import {HistoryRouter, IRouter, WebModuleRoutes} from "../../router";
import * as R from "@rematch/core";
// --> Must be imported here!
// otherwise this WebComponent is unknown
// to the TSXRenderer and the instance won't be created
// resulting in routing to now work at all!
import "../../router/src/RouterOutlet";

export interface WebAppConfig {
    routes: WebModuleRoutes|null,
    isDefault?: boolean;
    renderer?: IRenderer;
    router?: IRouter;
    logger?: ILogger;
    components?: {
        [componentName: string]: IComponent<any>;
    };
    models?: {
        [modelName: string]: IComponent<any>;
    }|null;
    store?: R.RematchStore|null;
}

export interface IWebApp<WC> {
    new(...args: any[]): WC;
}

export function WebApp<WA extends IWebApp<any>>(config: WebAppConfig): any {

    return (webApp: WA) => {

        const injectableWebApp = Component(webApp);
        const defaultWebAppConfig = ApplicationContext.getInstance().getWebAppConfig();

        if (injectableWebApp === DefaultWebApp) {

            config.isDefault = true;

        } else {

            // inherit default instances
            if (!config.logger) {
                config.logger = defaultWebAppConfig.logger;
            }

            if (!config.renderer) {
                config.renderer = defaultWebAppConfig.renderer;
            }

            if (!config.router) {
                config.router = defaultWebAppConfig.router;
            }
        }

        if (config.models) {

            const models: R.Models = {};

            // fetch native models
            for (const modelName in config.models) {
                models[modelName] = StateManager.getNativeModel(config.models[modelName]);
            }

            config.store = StateManager.createStore({
                // TODO: name?
                models
            });
        }

        if (config.router && config.routes) {

            // register routes within application router
            config.router.registerRoutes(config.routes);
        }

        ApplicationContext.getInstance().setWebAppConfig(config);

        return injectableWebApp;
    }
}

// default config
@WebApp({
    router: ApplicationContext.getInstance().getBean(HistoryRouter),
    renderer: ApplicationContext.getInstance().getBean(TSXRenderer),
    logger: ApplicationContext.getInstance().getBean(ConsoleLogger),
    routes: null,
})
export class DefaultWebApp {}