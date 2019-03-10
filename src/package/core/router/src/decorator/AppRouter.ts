import {RouterConfig} from "../interface/RouterConfig";
import {setAppRouter} from "../function/setAppRouter";

export function AppRouter(appRouterConfig: RouterConfig): any {

    // called with @AppRouter() or @AppRouter({})
    if (!(typeof appRouterConfig === 'function')) {

        return (target: any) => {
            setAppRouter(appRouterConfig);
            return target;
        }
    }
}