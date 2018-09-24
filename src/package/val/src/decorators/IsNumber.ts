import {baseValidator, DEFAULT_OPTIONS, Options} from "../Validate";
import {validateRequired} from "./Required";

export function IsNumber(options: Options = DEFAULT_OPTIONS) {
    return baseValidator((value) => {
        const required = validateRequired(value, options);
        if (required.isPresent() &&  !required.get()) {
            return false;
        }
        return validate(value);
    })
}

export const validate = (value: any): boolean => {
    return typeof value === 'number' || value instanceof Number;
};