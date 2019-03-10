import {ComponentImpl, VirtualElement} from "../../../index";
import {registerRoute} from "../function/registerRoute";

export function Route(route: string, routeTargetWebComponent: VirtualElement|ComponentImpl<any>): any {

    return (targetWebComponent: any) => {

        registerRoute(route, routeTargetWebComponent);

        return targetWebComponent;
    }
}