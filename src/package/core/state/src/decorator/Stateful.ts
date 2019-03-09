import {connectComponent} from "../function/connectComponent";
import {ComponentReflector} from "../../../di";

export interface IStateConnectedObject<CC> extends Function {
    new(...args: any[]): CC;
}

export interface ConnectConfig<CC extends IStateConnectedObject<any>> {}

const registerForConnect = (prototype: any) => {
    ComponentReflector.addInitializer(prototype, (instance: any) => {
        connectComponent(instance);
    })
};

export function Stateful<CC extends IStateConnectedObject<any>>(classToConnect?: ConnectConfig<CC>|CC): CC|any {

    // called with @Stateful() or @Stateful({})
    if (!(typeof classToConnect === 'function')) {

        return (target: any) => {
            registerForConnect(target);
            return target;
        }

    } else {

        registerForConnect(classToConnect);

        // called with @Stateful
        return classToConnect;
    }
}