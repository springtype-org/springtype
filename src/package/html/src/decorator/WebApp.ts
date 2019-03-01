import {IRenderer} from "../ui/IRenderer";
import {TSXRenderer} from "../ui/TSXRenderer";
import {ApplicationContext, Component} from "../../../di";
import {IRouter, WebModuleRoutes} from "../router/IRouter";
import {HistoryRouter} from "../router/HistoryRouter";
import {ILogger} from "../../../log";
import {ConsoleLogger} from "../../../log";
import * as R from "@rematch/core";

// --> Must be imported here!
// otherwise this WebComponent is unknown
// to the TSXRenderer and the instance won't be created
// resulting in routing to now work at all!
import "../router/RouterOutlet";
import {StateManager} from "../../../state";
import {IComponent} from "../../../di/src/decorator/Component";
import {hmrEntrypoint} from "../../../hmr";

export interface WebAppConfig {
    routes: WebModuleRoutes|null,
    isDefault?: boolean;
    renderer?: IRenderer;
    router?: IRouter;
    logger?: ILogger;
    models?: {
        [modelName: string]: IComponent<any>;
    }|null;
    store?: R.RematchStore|null;
}

export interface IWebApp<WC> extends Function {
    new(...args: any[]): WC;
}

export function WebApp<WA extends IWebApp<any>>(config: WebAppConfig): any {

    return (webApp: WA) => {

        const injectableWebApp = Component(webApp);
        const appContext = ApplicationContext.getInstance();
        const defaultWebAppConfig = appContext.getWebAppConfig();

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

        appContext.setWebAppConfig(config);

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