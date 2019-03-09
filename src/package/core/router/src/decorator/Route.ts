import {ApplicationContext, IComponent, IReactCreateElement, Router} from "../../../index";

export const registerRoute = (route: string, webComponent: any): void => {

    const router: Router = ApplicationContext.getInstance().getBean(Router);

    router.registerRoutes({
        [route]: webComponent
    })
};

export function Route(route: string, routeTargetWebComponent: IReactCreateElement|IComponent<any>): any {

    return (targetWebComponent: any) => {

        registerRoute(route, routeTargetWebComponent);

        return targetWebComponent;
    }
}