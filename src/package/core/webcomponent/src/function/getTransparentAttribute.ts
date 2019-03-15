import {ATTRIBUTE_VALUE} from "../constant/ATTRIBUTE_VALUE";

export const getTransparentAttribute = (instance: any, attributeName: string) =>
    Reflect.get(instance, (ATTRIBUTE_VALUE + attributeName) as string);