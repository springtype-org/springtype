import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

export const MIN_LENGTH = 'min-length';

// decorator @MinLength
export const MinLength = (minimum: number) => getParameterValidateDecorator(minLength(minimum), MIN_LENGTH);

export const minLength = (minimum: number) => validatorNameFactory((value: string | Array<any>): boolean => {
    return value.length >= minimum;
}, MIN_LENGTH);

