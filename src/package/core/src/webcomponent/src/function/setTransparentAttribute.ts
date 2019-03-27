import {ATTRIBUTE_VALUE} from "../constant/ATTRIBUTE_VALUE";

export const setTransparentAttribute = (instance: any, attributeName: string, value: any) => {
    Reflect.set(instance, (ATTRIBUTE_VALUE + attributeName) as string,value);
};