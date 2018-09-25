import {baseValidator, DECORATOR_OPTIONS_DEFAULT} from "../ValidateMethod";
import {validateRequired, validate as fromRequiredvalidate} from "./Required"

export const NotEmpty = (options: OptionsNotEmpty = {...DECORATOR_OPTIONS_DEFAULT}) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => validate(value, options.full === true),
            options)
    );

export const validate = (value: any, full: boolean): boolean => {
    if(!fromRequiredvalidate(value)){
        return false
    }
    if (typeof value == 'string' || value instanceof String) {
        return value.length > 0;
    } else if (typeof value[Symbol.iterator] === 'function') {
        const iterator = value[Symbol.iterator]();
        let element = iterator.next();
        do{
            if(!fromRequiredvalidate(element.value)){
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