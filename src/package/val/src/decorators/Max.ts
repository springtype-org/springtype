import {baseValidator, DEFAULT_OPTIONS, Options} from "../Validate";
import {validateRequired} from "./Required"
import {validate as fromNumberValidate} from "./IsNumber"
import {validate as fromDateValidate} from "./IsDate"

export function Max<T extends number | Date>(maximum: T, options: Options = DEFAULT_OPTIONS) {
    return baseValidator((value) => {
        const required = validateRequired(value, options);
        if (required.isPresent() && !required.get()) {
            return false;
        }
        if (fromNumberValidate(value)) {
            if (fromNumberValidate(maximum)) {
                return validateNumber(value, <number> maximum)
            }
        }
        if (fromDateValidate(value)) {
            if (fromDateValidate(maximum)) {
                return validateDate(value, <Date> maximum)
            }
        }
        return false;
    });
}

export function validateNumber(value: number, maximum: number): boolean {
    return value <= maximum;
}

export function validateDate(value: Date, maximum: Date): boolean {
    return value <= maximum;
}
