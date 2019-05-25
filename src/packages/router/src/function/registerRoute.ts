import {ApplicationContext} from "@springtype/core";
import {ActiveRoute} from "../ActiveRoute";

export const registerRoute = (route: string, webComponent: any): void => {

    const router: ActiveRoute = ApplicationContext.getInstance().getBean(ActiveRoute);

    router.registerRoutes({
        [route]: webComponent
    })
};