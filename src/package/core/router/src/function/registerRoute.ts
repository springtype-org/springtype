import {ApplicationContext, Router} from "../../../index";

export const registerRoute = (route: string, webComponent: any): void => {

    const router: Router = ApplicationContext.getInstance().getBean(Router);

    router.registerRoutes({
        [route]: webComponent
    })
};