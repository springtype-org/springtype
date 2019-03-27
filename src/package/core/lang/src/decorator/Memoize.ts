import {memoize} from "../function/memoize";

export const Memoize = (ignoreArguments: Array<number> = []) => {

    if (typeof ignoreArguments !== 'function') {

        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
            descriptor.value = memoize(target[methodName]);
        };
    }
};