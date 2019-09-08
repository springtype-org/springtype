import {decorateLifecycle, LifecycleAfterType} from "../../function/decorateLifecycle";


export function OnAfterAdopt() {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {

        decorateLifecycle(target.constructor, LifecycleAfterType.ON_AFTER_ADOPT, undefined, descriptor);
        return descriptor;
    }
}
