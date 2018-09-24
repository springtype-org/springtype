import {baseValidator, DEFAULT_OPTIONS, Options} from "../Validate";
import {validateRequired} from "./Required"
import {validate as fromNumberValidate} from "./IsNumber"
import {validate as fromDateValidate} from "./IsDate";

export function Min<T extends number | Date>(minimum: T, options: Options = DEFAULT_OPTIONS) {
    return baseValidator((value) => {
        const required = validateRequired(value, options);
        if (required.isPresent() &&  !required.get()) {
            return false;
        }
        if (fromNumberValidate(value)) {
            if (fromNumberValidate(minimum)) {
                return validateNumber(value, <number> minimum)
            }
        }
        if (fromDateValidate(value)) {
            if (fromDateValidate(minimum)) {
                return validateDate(value, <Date> minimum)
            }
        }
        return false;
    });
}

export function validateNumber(value: number, minimum: number): boolean {
    return value >= minimum;
}

export function validateDate(value: Date, minimum: Date): boolean {
    return value >= minimum;
}
