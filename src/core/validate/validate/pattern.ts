import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

const VALIDATOR_NAME = 'pattern';

// decorator @Pattern
export const Pattern = (regex: RegExp) => getParameterValidateDecorator(pattern(regex), VALIDATOR_NAME);

export const pattern = (regex: RegExp) => validatorNameFactory((value: string): boolean => {
    const results = regex.exec(value);
    if (null == results || results.length == 0) {
        return false;
    }
    return results[0] === value;
}, VALIDATOR_NAME);
