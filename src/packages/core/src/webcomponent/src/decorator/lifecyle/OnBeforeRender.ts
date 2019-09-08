import {decorateLifecycle, LifecycleBeforeType} from "../../function/decorateLifecycle";


export function OnBeforeRender() {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {
        decorateLifecycle(target.constructor, LifecycleBeforeType.ON_BEFORE_RENDER, undefined, descriptor);
    }
}
