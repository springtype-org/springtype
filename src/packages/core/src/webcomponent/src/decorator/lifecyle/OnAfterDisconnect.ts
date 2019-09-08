import {decorateLifecycle, LifecycleAfterType} from "../../function/decorateLifecycle";


export function OnAfterAdopt() {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {

        decorateLifecycle(target.constructor, LifecycleAfterType.ON_AFTER_DISCONNECT, undefined, descriptor);
        return descriptor;
    }
}
