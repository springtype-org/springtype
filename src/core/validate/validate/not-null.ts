import { getParameterValidateDecorator } from "../function/get-parameter-validate-decorator";

// decorator @NotNull
export const NotNull = () => getParameterValidateDecorator(validateNotNull, 'NotNull');

export const validateNotNull = (value: any): boolean => null !== value;
