import {memoize} from "../function/memoize";

export const Memoize = (target: any, methodName: string, descriptor: PropertyDescriptor) => {

    descriptor.value = memoize(target[methodName]);
};