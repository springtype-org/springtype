import {buffer} from "../function/buffer";

export const Buffer = (ms: number, returnPromise: boolean = true) => {

    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {

        descriptor.value = buffer(target[methodName], ms, returnPromise);
    };
};