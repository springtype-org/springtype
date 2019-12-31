import { getParameterValidateDecorator } from "../function/get-parameter-validate-decorator";

// decorator @IsDefined
export const IsDefined = () => getParameterValidateDecorator(validateIsDefined, 'IsDefined');

export const validateIsDefined = (value: any): boolean => {
    return value !== undefined
};
