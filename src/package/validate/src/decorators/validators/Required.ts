import {validate as notNullValidate} from "./NotNull";
import {validate as definedValidate} from "./IsDefined";
import {baseValidator} from "../ValidateMethod";


export const Required = () => baseValidator(validate);

export const validate = (value: any): boolean => {
    return notNullValidate(value) && definedValidate(value)
};


