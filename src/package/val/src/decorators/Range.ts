import {baseValidator, DEFAULT_OPTIONS, Options} from "../Validate";
import {validateRequired} from "./Required"
import {validateDate as fromMaxValidateDate, validateNumber as fromMaxValidateNumber} from "./Max"
import {validateDate as fromMinValidateDate, validateNumber as fromMinValidateNumber} from "./Min"
import {validate as fromNumberValidate} from "./IsNumber"
import {validate as fromDateValidate} from "./IsDate";


export function Range<T extends number | Date>(minimum: T, maximum: T, options: Options = DEFAULT_OPTIONS) {
    return baseValidator((value) => {
        const required = validateRequired(value, options);
        if (required.isPresent() && !required.get()) {
            return false;
        }
        if (fromNumberValidate(value)) {
            if (fromNumberValidate(minimum) && fromNumberValidate(maximum)) {
                return validateNumber(value, <number> minimum, <number> maximum);
            }
        }
        if (fromDateValidate(value)) {
            if (fromDateValidate(minimum) && fromDateValidate(maximum)) {
                return validateDate(value, <Date> minimum, <Date> maximum);
            }
        }
        return false;
    });
}

function validateNumber(value: any, minimum: number, maximum: number): boolean {
    return fromMaxValidateNumber(value, maximum) && fromMinValidateNumber(value, minimum)
}

function validateDate(value: any, minimum: Date, maximum: Date): boolean {
    return fromMaxValidateDate(value, maximum) && fromMinValidateDate(value, minimum)
}
