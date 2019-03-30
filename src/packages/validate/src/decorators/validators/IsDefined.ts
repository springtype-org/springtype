import {baseValidator} from "../ValidateMethod";

export const IsDefined = () => baseValidator(validate);

export const validate = (value: any): boolean => {
    return value !== undefined
};

