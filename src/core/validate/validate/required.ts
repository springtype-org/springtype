import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

const VALIDATOR_NAME = 'required';

// decorator @Required
export const Required = () => getParameterValidateDecorator(required, VALIDATOR_NAME);

export const required = validatorNameFactory((value: any): boolean => {
    return !!value
}, VALIDATOR_NAME);

