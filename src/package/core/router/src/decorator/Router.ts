import {RouterConfig} from "../interface/RouterConfig";
import {setRouter} from "../function/setRouter";

export function Router(routerConfig: RouterConfig): any {

    // called with @Router() or @Router({})
    if (!(typeof routerConfig === 'function')) {

        return (target: any) => {
            setRouter(routerConfig);
            return target;
        }
    }
}