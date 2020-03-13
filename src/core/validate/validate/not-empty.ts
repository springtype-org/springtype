import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";
import {minLength} from "./min-length";

const VALIDATOR_NAME = 'pattern';

// decorator @NotEmpty
export const NotEmpty = () => getParameterValidateDecorator(notEmpty, VALIDATOR_NAME);

export const notEmpty = validatorNameFactory((value: string | Array<any>): boolean => {
    return minLength(1)(value);
}, VALIDATOR_NAME);
