import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";
import {TYPE_UNDEFINED} from "../../lang";

export const IS_DEFINED = 'defined';

// decorator @IsDefined
export const IsDefined = () => getParameterValidateDecorator(defined, IS_DEFINED);

export const defined = validatorNameFactory((value: any): boolean => {
    return typeof value !== TYPE_UNDEFINED;
}, IS_DEFINED);
