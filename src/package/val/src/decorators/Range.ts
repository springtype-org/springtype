import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options, validateRequired} from "../ValidateMethod";
import {validateDate as fromMaxValidateDate, validateNumber as fromMaxValidateNumber} from "./Max"
import {validateDate as fromMinValidateDate, validateNumber as fromMinValidateNumber} from "./Min"
import {validate as fromNumberValidate} from "./IsNumber"
import {validate as froStringValidate} from "./IsString"
import {validate as fromDateValidate} from "./IsDate";
import {hasIterator} from "./NotEmpty";


export const Range = <T extends number | Date>(minimum: T, maximum: T, options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () =>
                (fromNumberValidate(value)
                    && (fromNumberValidate(minimum)
                        && fromNumberValidate(maximum))
                    && validateNumber(value, <number> minimum, <number> maximum))
                ||
                (fromDateValidate(value)
                    && (fromDateValidate(minimum)
                        && fromDateValidate(maximum))
                    && validateDate(value, <Date> minimum, <Date> maximum))
                ||
                (hasIterator(value) && !froStringValidate(value)
                    && (fromNumberValidate(minimum)
                        && fromNumberValidate(maximum))
                    && validateIterator(value, <number> minimum, <number> maximum)),
            options)
    );

export const validateNumber = (value: any, minimum: number, maximum: number): boolean =>
    fromMaxValidateNumber(value, maximum) && fromMinValidateNumber(value, minimum);

export const validateDate = (value: any, minimum: Date, maximum: Date): boolean =>
    fromMaxValidateDate(value, maximum) && fromMinValidateDate(value, minimum);

export const validateIterator = (value: any, minimum: number, maximum: number): boolean => {
    if (minimum < 0 || maximum < 0 || minimum > maximum) {
        return false;
    }
    const length = value[Symbol.iterator].length;
    return fromMaxValidateNumber(length, maximum) && fromMinValidateNumber(length, minimum);
};
