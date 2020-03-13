import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

const VALIDATOR_NAME = 'min-length';

// decorator @MinLength
export const MinLength = (minimum: number) => getParameterValidateDecorator(minLength(minimum), VALIDATOR_NAME);

export const minLength = (minimum: number) => validatorNameFactory((value: string | Array<any>): boolean => {
    return value.length >= minimum;
}, VALIDATOR_NAME);

