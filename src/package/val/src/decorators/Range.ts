import {baseValidator} from "../Validate";
import {validate as requiredValidate}  from "./Required"
import {validate as maxValidate}  from "./Max"
import {validate as minValidate} from "./Min"
import {validateType} from "./Max";

export function Range(minimum: number, maximum: number) {
    return baseValidator((value) => {
        if (!requiredValidate(value)) {
            return false;
        }
        if (!validateType(value)) {
            throw Error(`Invalid range (type=${typeof value})`);
        }
        return validate(value, minimum, maximum,)
    });
}

function validate(value: any, minimum: number, maximum: number): boolean {
    return maxValidate(value, maximum) && minValidate(value, minimum)
}
