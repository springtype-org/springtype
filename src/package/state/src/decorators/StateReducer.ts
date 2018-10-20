export const IS_REDUCER = Symbol('IS_REDUCER');

export const StateReducer = (prototype: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.set(prototype[methodName], IS_REDUCER,true);
};