import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

const VALIDATOR_NAME = 'max-length';

// decorator @MaxLength
export const MaxLength = (maximum: number) => getParameterValidateDecorator(maxLength(maximum), VALIDATOR_NAME);

export const maxLength = (maximum: number) => validatorNameFactory((value: string | Array<any>): boolean => {
    return value.length <= maximum;
}, VALIDATOR_NAME);

