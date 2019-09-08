import {decorateLifecycle, LifecycleAfterType} from "../../function/decorateLifecycle";


export function OnAfterConnect() {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {

        decorateLifecycle(target.constructor, LifecycleAfterType.ON_AFTER_CONNECT, undefined, descriptor);
        return descriptor;
    }
}
