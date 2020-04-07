import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

export const MAX_LENGTH = 'max-length';

// decorator @MaxLength
export const MaxLength = (maximum: number) => getParameterValidateDecorator(maxLength(maximum), MAX_LENGTH);

export const maxLength = (maximum: number) => validatorNameFactory((value: string | Array<any>): boolean => {
    return value.length <= maximum;
}, MAX_LENGTH);

