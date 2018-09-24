import {baseValidator, DEFAULT_OPTIONS, Options} from "../Validate";
import {validateRequired} from "./Required";

export function IsString(options: Options = DEFAULT_OPTIONS){
    return baseValidator((value) => {
        const required = validateRequired(value, options);
        if (required.isPresent() && !required.get()) {
            return false;
        }
        return validate(value);
    })
}

export const validate = (value: any): boolean => {
    return typeof value === 'string' || value instanceof String;
};
