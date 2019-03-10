import {ApplicationContext, IComponent, Router} from "../../../index";
import {registerRoute} from "../function/registerRoute";
import {VirtualElement} from "../../../renderer/src/interface/IReactCreateElement";

export function Route(route: string, routeTargetWebComponent: VirtualElement|IComponent<any>): any {

    return (targetWebComponent: any) => {

        registerRoute(route, routeTargetWebComponent);

        return targetWebComponent;
    }
}