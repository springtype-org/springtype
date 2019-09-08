import {decorateLifecycle, LifecycleBeforeType} from "../../function/decorateLifecycle";


export function OnBeforeConnect() {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {
        decorateLifecycle(target.constructor, LifecycleBeforeType.ON_BEFORE_CONNECT, undefined, descriptor);
    }
}
