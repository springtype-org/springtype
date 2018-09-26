import {baseValidator, Options} from "../ValidateMethod";
import {validate as notNullValidate} from "./NotNull";
import {validate as definedValidate} from "./IsDefined";


export const Required = () => baseValidator(validate);

export const validate = (value: any): boolean => {
    return notNullValidate(value) && definedValidate(value)
};

export const validateRequired = (value: any, func: () => boolean, options: Options,): boolean => {
    const isValid = validate(value);
    if (!!!options.required) {
        //required === false
        if (isValid) {
            return func();
        }
        return true;
    } else {
        //required === true
        return isValid && func();
    }

};
