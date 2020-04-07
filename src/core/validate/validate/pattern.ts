import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

export const PATTERN = 'pattern';

export const Pattern = (regex: RegExp) => getParameterValidateDecorator(pattern(regex), PATTERN);

export const pattern = (regex: RegExp) => validatorNameFactory((value: string): boolean => {
    const results = regex.exec(value);
    if (null == results || results.length == 0) {
        return false;
    }
    return results[0] === value;
}, PATTERN);
