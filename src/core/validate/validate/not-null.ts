import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

const VALIDATOR_NAME = 'not-null';

// decorator @NotNull
export const NotNull = () => getParameterValidateDecorator(notnull, VALIDATOR_NAME);

export const notnull = validatorNameFactory((value: any): boolean => null !== value, VALIDATOR_NAME);
