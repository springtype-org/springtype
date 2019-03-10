import {IS_REDUCER} from "../constant/IS_REDUCER";

export const StateReducer = (modelPrototype: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.set(modelPrototype[methodName], IS_REDUCER,true);
};