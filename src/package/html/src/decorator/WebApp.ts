import {IRenderer} from "../ui/IRenderer";
import {TSXRenderer} from "../ui/TSXRenderer";
import {ApplicationContext, Component} from "../../../di";
import {IRouter} from "../router/IRouter";
import {HistoryRouter} from "../router/HistoryRouter";
import {ILogger} from "../../../log/src/ILogger";
import {ConsoleLogger} from "../../../log";

export interface WebAppConfig {
    isDefault?: boolean;
    renderer?: IRenderer;
    router?: IRouter;
    logger?: ILogger;
}

export interface IWebApp<WC> extends Function {
    new(...args: any[]): WC;
}

export function WebApp<WA extends IWebApp<any>>(config: WebAppConfig): any {

    return (target: WA) => {

        if (target === DefaultWebApp) {
            config.isDefault = true;
        }

        ApplicationContext.getInstance().setWebAppConfig(config);

        return target;
    }
}

@WebApp({

    // creates implicit loggers
    router: ApplicationContext.getInstance().getBean(HistoryRouter),
    renderer: ApplicationContext.getInstance().getBean(TSXRenderer),
    logger: ApplicationContext.getInstance().getBean(ConsoleLogger),
})
@Component
export class DefaultWebApp {}