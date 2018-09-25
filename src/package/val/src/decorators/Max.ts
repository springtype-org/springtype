import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options} from "../ValidateMethod";
import {validateRequired} from "./Required"
import {validate as fromNumberValidate} from "./IsNumber"
import {validate as fromDateValidate} from "./IsDate"

export const Max = <T extends number | Date>(maximum: T, options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () =>
                fromNumberValidate(value) && fromNumberValidate(maximum) && validateNumber(value, <number> maximum) ||
                fromDateValidate(value) && fromDateValidate(maximum) && validateDate(value, <Date> maximum),
            options)
    );

export function validateNumber(value: number, maximum: number): boolean {
    return value <= maximum;
}

export function validateDate(value: Date, maximum: Date): boolean {
    return value <= maximum;
}
