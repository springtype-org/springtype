import {decorateLifecycle, LifecycleBeforeType} from "../../function/decorateLifecycle";


export function OnBeforeFlow(initial?: boolean) {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {
        decorateLifecycle(target.constructor, LifecycleBeforeType.ON_BEFORE_FLOW, initial, descriptor);
    }
}
