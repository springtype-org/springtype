import {RouterImpl} from "../..";
import {ApplicationContext} from "../../../di";
import {APP_ROUTER} from "../constant/APP_ROUTER";
import {defaultAppRouterConfig} from "../constant/defaultAppRouterConfig";
import {setAppRouter} from "./setAppRouter";

export const getAppRouter = (): RouterImpl => {

    let routerImpl = ApplicationContext.getInstance().get(APP_ROUTER);

    // @AppRouter(...) not used in application
    if (!routerImpl) {
        setAppRouter(defaultAppRouterConfig);
    }
    return ApplicationContext.getInstance().get(APP_ROUTER);
};
