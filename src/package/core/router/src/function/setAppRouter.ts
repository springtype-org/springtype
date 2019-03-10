import {ApplicationContext} from "../../../di";
import {RouterConfig} from "../interface/RouterConfig";
import {getRouterImplInstance} from "./getRouterImplInstance";
import {APP_ROUTER} from "../constant/APP_ROUTER";

export const setAppRouter = (appRouterConfig: RouterConfig): void => {
    ApplicationContext.getInstance().set(APP_ROUTER, getRouterImplInstance(appRouterConfig));
};
