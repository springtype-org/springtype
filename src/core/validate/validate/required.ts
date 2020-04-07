import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

export const REQUIRED = 'required';

// decorator @Required
export const Required = () => getParameterValidateDecorator(required, REQUIRED);

export const required = validatorNameFactory((value: any): boolean => {
    return !!value
}, REQUIRED);

