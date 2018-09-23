import {baseValidator} from "../Validate";
import {validate as fromRequiredValidate}   from "./Required"
import {validateType} from "./Max";

export function Min(minimum: number) {
    return baseValidator((value) => {
        if (!fromRequiredValidate(value)) {
            return false;
        }
        if (!validateType(value)) {
            throw Error(`Invalid minimum (type=${typeof value})`);
        }
        return validate(value, minimum)
    });
}

export function validate(value: any, minimum: number): boolean {
    return value >= minimum;
}
