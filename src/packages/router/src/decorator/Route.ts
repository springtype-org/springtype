import {ComponentImpl, VirtualElement} from "@springtype/springtype-incubator-core";
import {registerRoute} from "../function/registerRoute";

export function Route(route: string, routeTargetWebComponent: VirtualElement|ComponentImpl<any>): any {

    return (targetWebComponent: any) => {

        registerRoute(route, routeTargetWebComponent);

        return targetWebComponent;
    }
}