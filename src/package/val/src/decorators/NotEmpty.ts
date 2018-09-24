import {baseValidator, DEFAULT_OPTIONS} from "../Validate";
import {validateRequired} from "./Required"

export function NotEmpty(all = false, options: OptionsNotEmpty = DEFAULT_OPTIONS) {
    return baseValidator((value: any) => {
        const required = validateRequired(value, options);
        if (required.isPresent() && !required.get()) {
            return false;
        }
        return validate(value, options.all === true);
    })
}

function validate(value: any, all: boolean): boolean {
    if (typeof value == 'string' || value instanceof String) {
        return value.length > 0;
    } else if (typeof value[Symbol.iterator] === 'function') {
        const iterator = value[Symbol.iterator]();
        let element = iterator.next();
        while (!element.done) {
            if (!validate(element.value, all)) {
                return false;
            }
            if (all === false) {
                return true;
            }
            element = iterator.next();
        }
    }
    return true;
}

export type OptionsNotEmpty = {
    required?: boolean;
    all?: boolean;
}