import {baseValidator} from "../Validate";
import * as fromRequired from "./Required"
import * as fromMax from "./Max"
import * as fromMin from "./Min"
import {validateType} from "./Max";

export function Range(minimum: number, maximum: number) {
    return baseValidator((value) => {
        if (!fromRequired.validate(value)) {
            return false;
        }
        if (!validateType(value)) {
            throw Error(`Invalid range (type=${typeof value})`);
        }
        return validate(value, minimum, maximum,)
    });
}

function validate(value: any, minimum: number, maximum: number): boolean {
    return fromMax.validate(value, maximum) && fromMin.validate(value, minimum)
}
