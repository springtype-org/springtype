import {decorateLifecycle, LifecycleBeforeType} from "../../function/decorateLifecycle";


export function OnBeforeAttributeChange(name: string, oldValue: any, attributeValue: any) {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {
        decorateLifecycle(target.constructor, LifecycleBeforeType.ON_BEFORE_ATTRIBUTE_CHANGE, [name,oldValue,attributeValue], descriptor);
    }
}
