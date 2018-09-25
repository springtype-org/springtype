import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options} from "../ValidateMethod";
import {validateRequired} from "./Required";
import {validate as fromDateValidate} from "./IsDate";

export const Future = (options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => fromDateValidate(value) && validate(<Date> value),
            options)
    );

export const validate = (value: Date): boolean => {
    return new Date() < value;
};