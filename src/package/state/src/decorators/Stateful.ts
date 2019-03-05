import {ComponentReflector} from "../../../di/src/ComponentReflector";
import {connectComponent} from "../connectComponent";

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
            console.log('connectec HOC @Stateful(), storeConnected to store here using store.subscribe()', target);

            registerForConnect(target);
            return target;
        }

    } else {

        console.log('connectec HOC @Stateful, storeConnected to store here using store.subscribe()', classToConnect);

        registerForConnect(classToConnect);
        // called with @Stateful
        return classToConnect;
    }
}