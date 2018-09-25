import {baseValidator} from "../ValidateMethod";

export const NotNull = () => baseValidator(validate);

export const validate = (value: any): boolean => null !== value;