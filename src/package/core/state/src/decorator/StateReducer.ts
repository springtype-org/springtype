export const IS_REDUCER = 'IS_REDUCER';

export const StateReducer = (modelPrototype: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.set(modelPrototype[methodName], IS_REDUCER,true);
};