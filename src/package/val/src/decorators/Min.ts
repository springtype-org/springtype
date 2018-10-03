import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options, validateRequired} from "../ValidateMethod";
import {validate as fromNumberValidate} from "./IsNumber"
import {validate as fromDateValidate} from "./IsDate";

export const Min = <T extends number | Date>(minimum: T, options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () =>
                fromNumberValidate(value) && fromNumberValidate(minimum) && validateNumber(value, <number> minimum) ||
                fromDateValidate(value) && fromDateValidate(minimum) && validateDate(value, <Date> minimum),
            options)
    );

export function validateNumber(value: number, minimum: number): boolean {
    return value >= minimum;
}

export function validateDate(value: Date, minimum: Date): boolean {
    return value >= minimum;
}
