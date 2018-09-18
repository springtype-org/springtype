import {baseValidator} from "../Validate";
import * as fromRequired from "./Required"

export function Max(maximum: number) {
    return baseValidator((value) => validate(value, maximum));
}

export function validate(value: any, maximum: number): boolean {
    if(!fromRequired.validate(value)){
        return false;
    }
    if (typeof value === 'number' || value instanceof Number) {
        return value <= maximum;
    }
    throw Error(`Invalid maximum (type=${typeof value})`);

}
