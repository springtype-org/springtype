import {RouterConfig} from "../interface/RouterConfig";
import {RouterImplType} from "../enum/RouterImplType";
import {RouterImpl} from "../index";
import {HistoryRouterImpl} from "../impl/HistoryRouterImpl";

export const getRouterImplInstance = (routerConfig: RouterConfig): RouterImpl => {

    let routerImpl: RouterImpl;

    // custom impl provided via config
    if (routerConfig.impl) {

        routerImpl = routerConfig.impl;

    } else {

        // using standard implementation
        switch (routerConfig.type) {

            default:
            case RouterImplType.HISTORY:
                routerImpl = new HistoryRouterImpl();
                break;
        }
    }

    return routerImpl;
};