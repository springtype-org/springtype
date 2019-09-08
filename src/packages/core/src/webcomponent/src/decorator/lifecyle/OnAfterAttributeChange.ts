import {decorateLifecycle, LifecycleAfterType} from "../../function/decorateLifecycle";


export function OnAfterAttributeChange(name: string, oldValue: any, attributeValue: any) {
    return (target: any, functionName: string, descriptor: PropertyDescriptor) => {

        decorateLifecycle(target.constructor, LifecycleAfterType.ON_AFTER_ATTRIBUTE_CHANGE, [name,oldValue,attributeValue], descriptor);
        return descriptor;
    }
}
