import {baseValidator} from "../Validate";
import * as fromRequired from "./Required"
import * as fromMax from "./Max"
import * as fromMin from "./Min"

export function Range(minimum: number, maximum: number) {
    return baseValidator((value) => validate(value, minimum, maximum,));
}

function validate(value: any, minimum: number, maximum: number): boolean {
    if (!fromRequired.validate(value)) {
        return false;
    }
    if (typeof value === 'number' || value instanceof Number) {
        return fromMax.validate(value, maximum) && fromMin.validate(value, minimum)
    }
    throw Error(`Invalid range (type=${typeof value})`);

}
