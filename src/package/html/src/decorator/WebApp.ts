import {IRenderer} from "../ui/IRenderer";
import {TSXRenderer} from "../ui/TSXRenderer";
import {ApplicationContext, Component} from "../../../di";
import {IRouter} from "../router/IRouter";
import {HistoryRouter} from "../router/HistoryRouter";

export interface WebAppConfig {
    isDefault?: boolean;
    renderer?: IRenderer;
    router?: IRouter;
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
    router: ApplicationContext.getInstance().getBean(HistoryRouter),
    renderer: ApplicationContext.getInstance().getBean(TSXRenderer)
})
@Component
export class DefaultWebApp {}