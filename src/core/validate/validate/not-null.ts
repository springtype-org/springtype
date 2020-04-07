import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

export const NOT_NULL = 'not-null';

// decorator @NotNull
export const NotNull = () => getParameterValidateDecorator(notnull, NOT_NULL);

export const notnull = validatorNameFactory((value: any): boolean => null !== value, NOT_NULL);
