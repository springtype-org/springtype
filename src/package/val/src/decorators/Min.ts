import {baseValidator} from "../Validate";
import * as fromRequired from "./Required"

export function Min(minimum: number) {
    return baseValidator((value) => validate(value, minimum));
}

export function validate(value: any, minimum: number): boolean {
    if(!fromRequired.validate(value)){
        return false;
    }
    if (typeof value === 'number' || value instanceof Number) {
        return value >= minimum;
    }
    throw Error(`Invalid minimum (type=${typeof value})`);

}
