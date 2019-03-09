import {IRenderer, TSXRenderer} from "../../renderer";
import {ApplicationContext, Component, IComponent, StateManager} from "../../index";
import {HistoryRouter, IRouter} from "../../router";
import * as R from "@rematch/core";
import {hmrEntrypoint} from "../../hmr";

// @ts-ignore
hmrEntrypoint(module);

// --> Must be imported here!
// otherwise this WebComponent is unknown
// to the TSXRenderer and the instance won't be created
// resulting in routing to now work at all!
import "../../router/src/RouterOutlet";

export interface WebAppConfig {
    isDefault?: boolean;
    renderer?: IRenderer;
    router?: IRouter;
    components?: Array<IComponent<any>>;
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
                models
            });
        }

        ApplicationContext.getInstance().setWebAppConfig(config);

        return injectableWebApp;
    }
}

// default config
@WebApp({
    router: ApplicationContext.getInstance().getBean(HistoryRouter),
    renderer: ApplicationContext.getInstance().getBean(TSXRenderer),
})
export class DefaultWebApp {}