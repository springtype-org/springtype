import {baseValidator} from "../Validate";
import {validate as notNullValidate} from "./NotNull";
import {validate as definedValidate} from "./IsDefined";


export function Required() {
    return baseValidator(validate)
}

export const validate = (value: any): boolean => {
    return notNullValidate(value) && definedValidate(value)
};

