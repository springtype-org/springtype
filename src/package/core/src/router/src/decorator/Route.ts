import {ComponentReflector} from "../../../index";
import {WebModuleRoutes} from "../IRouter";

export interface RoutingTargetObject<RTO> extends Function {
    new(...args: any[]): RTO;
}

export interface RouteConfig extends WebModuleRoutes {
}

const registerRoute = (prototype: any, routeConfig: RouteConfig) => {

    ComponentReflector.addInitializer(prototype, (instance: any) => {

        console.log('annotate routeConfig', routeConfig, 'to', prototype, 'instance', instance);
    });
};

export function Route<RTO extends RoutingTargetObject<any>>(routeConfig: RouteConfig): RTO|any {

    // called with @Route() or @Route({})
    if (!(typeof routeConfig === 'function')) {

        return (target: any) => {
            registerRoute(target, routeConfig);
            return target;
        }
    }
}