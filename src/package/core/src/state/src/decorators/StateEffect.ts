export const IS_EFFECT = Symbol('IS_EFFECT');

export const StateEffect = (prototype: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.set(prototype[methodName], IS_EFFECT,true);
};