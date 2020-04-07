import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";
import {minLength} from "./min-length";
import {maxLength} from "./max-length";

export const RANGE = 'range';

// decorator @Range
export const Range = (minimum: number, maximum: number) => getParameterValidateDecorator(range(minimum, maximum), RANGE);

export const range = (minimum: number, maximum: number) => validatorNameFactory((value: string | Array<any>): boolean => {
    return minLength(minimum)(value) && maxLength(maximum)(value)
}, RANGE);
