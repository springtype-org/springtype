import {baseValidator} from "../Validate";
import {validate as fromRequiredValidate}   from "./Required"

export function NotEmpty(all = false) {
    return baseValidator((value: any) => validate(value, all));
}

function validate(value: any, all: boolean): boolean {
    if (!fromRequiredValidate(value)) {
        return false;
    }
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
