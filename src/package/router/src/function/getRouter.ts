import {RouterImpl} from "../../index";
import {ApplicationContext} from "@springtype/springtype-incubator-core";
import {ROUTER} from "../constant/ROUTER";
import {defaultRouterConfig} from "../constant/defaultRouterConfig";
import {setRouter} from "./setRouter";

export const getRouter = (): RouterImpl => {

    let routerImpl = ApplicationContext.getInstance().get(ROUTER);

    // @Router(...) not used in application
    if (!routerImpl) {
        setRouter(defaultRouterConfig);
    }
    return ApplicationContext.getInstance().get(ROUTER);
};
