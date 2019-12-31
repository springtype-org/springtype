import { getParameterValidateDecorator } from "../function/get-parameter-validate-decorator";
import { validateNotNull } from "./not-null";
import { validateIsDefined } from "./is-defined";

// decorator @Required
export const Required = () => getParameterValidateDecorator(validateRequired, 'Required');

export const validateRequired = (value: any): boolean => {
    return validateNotNull(value) && validateIsDefined(value)
};

