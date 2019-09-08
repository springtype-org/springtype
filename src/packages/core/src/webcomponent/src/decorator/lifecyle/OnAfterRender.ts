import {decorateLifecycle, LifecycleAfterType} from "../../function/decorateLifecycle";

export function OnAfterRender() {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {

        decorateLifecycle(target.constructor, LifecycleAfterType.ON_AFTER_RENDER, undefined, descriptor);
    }
}
