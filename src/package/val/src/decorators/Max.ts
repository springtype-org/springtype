import {baseValidator} from "../Validate";
import {validate as fromRequiredValidate}   from "./Required"

export function Max(maximum: number) {
    return baseValidator((value) => {
        if (!fromRequiredValidate(value)) {
            return false;
        }
        if (!validateType(value)) {
            throw Error(`Invalid maximum (type=${typeof value})`);
        }
        return validate(value, maximum)
    });
}

export function validate(value: any, maximum: number): boolean {
    return value <= maximum;
}

export function validateType(value: any): boolean {
    return typeof value === 'number' || value instanceof Number;
}
