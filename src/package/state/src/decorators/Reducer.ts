export const IS_REDUCER = Symbol('IS_REDUCER');

export const Reducer = (prototype: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.set(prototype[methodName], IS_REDUCER,true);
};