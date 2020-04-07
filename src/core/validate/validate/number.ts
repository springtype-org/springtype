import {validatorNameFactory} from "../function/validator-name-factory";
import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {pattern} from "./pattern";

export const NUMBER = 'number';

export const Number = (regex: RegExp) => getParameterValidateDecorator(pattern(regex), NUMBER);

export const number = validatorNameFactory((value: string): boolean => {
    return /[0-9]/.test(value);
}, NUMBER);
