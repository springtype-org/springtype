import {measureSpeed} from "../function/measureSpeed";

export const MeasureSpeed = (target: any, methodName: string, descriptor: PropertyDescriptor) => {

    if (typeof target !== 'function') {

        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
            descriptor.value = measureSpeed(methodName, target[methodName]);
        };

    } else {
        descriptor.value = measureSpeed(methodName, target[methodName]);
    }
};