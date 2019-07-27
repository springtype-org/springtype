import {RouterImpl} from "../index";
import {ApplicationContext} from "@springtype/core";
import {defaultRouterConfig} from "../defaultRouterConfig";
import {RouterConfig} from "../interface/RouterConfig";
import {getRouterImplInstance} from "../function/getRouterImplInstance";

const ROUTER = 'ROUTER';

export const getRouter = (): RouterImpl => {

    let routerImpl = ApplicationContext.getInstance().get(ROUTER);

    // @Router(...) not used in application
    if (!routerImpl) {
        setRouter(defaultRouterConfig);
    }
    return ApplicationContext.getInstance().get(ROUTER);
};

export const setRouter = (appRouterConfig: RouterConfig): void => {
    ApplicationContext.getInstance().set(ROUTER, getRouterImplInstance(appRouterConfig));
};
