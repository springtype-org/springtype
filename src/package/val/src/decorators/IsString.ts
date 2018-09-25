import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options} from "../ValidateMethod";
import {validateRequired} from "./Required";

export const IsString = (options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired        (
            value,
            () => validate(value),
            options)
    );


export const validate = (value: any): boolean => {
    return typeof value === 'string' || value instanceof String;
};
