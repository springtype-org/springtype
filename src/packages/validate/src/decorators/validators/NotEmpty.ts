import {baseValidator, DECORATOR_OPTIONS_DEFAULT, validateRequired} from "../ValidateMethod";
import {validate as fromRequiredValidate} from "./Required"

export const NotEmpty = (options: OptionsNotEmpty = {...DECORATOR_OPTIONS_DEFAULT}) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => validate(value, options.full === true),
            options)
    );

export const validate = (value: any, full: boolean): boolean => {
    if (!fromRequiredValidate(value)) {
        return false
    }
    if (typeof value == 'string' || value instanceof String) {
        return value.length > 0;
    } else if (hasIterator(value)) {
        const iterator = value[Symbol.iterator]();
        let element = iterator.next();
        do {
            if (!fromRequiredValidate(element.value)) {
                return false
            }
            if (!validate(element.value, full)) {
                return false;
            }
            if (full === false) {
                return true;
            }
            element = iterator.next();
        }
        while (element.done === false)
    }
    return true;
};

export type OptionsNotEmpty = {
    required?: boolean;
    full?: boolean;
}

export const hasIterator = (value: any) => typeof value[Symbol.iterator] === 'function';
