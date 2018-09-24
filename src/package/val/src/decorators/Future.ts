import {baseValidator, DEFAULT_OPTIONS, Options} from "../Validate";
import {validateRequired} from "./Required";
import {validate as fromDateValidate} from "./IsDate";

export function Future(options: Options = DEFAULT_OPTIONS) {
    return baseValidator((value) => {
        const required = validateRequired(value, options);
        if (required.isPresent() && !required.get()) {
            return false;
        }
        if (fromDateValidate(value)) {
            return validate(<Date> value);
        }
        return false;
    })
}

export const validate = (value: Date): boolean => {
    return new Date() < value;
};