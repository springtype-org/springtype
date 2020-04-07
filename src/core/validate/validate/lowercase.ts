import {validatorNameFactory} from "../function/validator-name-factory";
import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {maxLength} from "./max-length";

export const LOWERCASE = 'lowercase';

// decorator @MaxLength
export const Lowercase = (maximum: number) => getParameterValidateDecorator(maxLength(maximum), LOWERCASE);

export const lowercase = validatorNameFactory((value: string): boolean => {
    return /[a-z]/.test(value);
}, LOWERCASE);
