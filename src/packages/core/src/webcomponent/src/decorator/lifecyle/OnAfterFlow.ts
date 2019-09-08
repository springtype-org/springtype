import {decorateLifecycle, LifecycleAfterType} from "../../function/decorateLifecycle";


export function OnAfterFlow(initial?: boolean) {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {

        decorateLifecycle(target.constructor, LifecycleAfterType.ON_AFTER_FLOW, initial, descriptor);
        return descriptor;
    }
}
