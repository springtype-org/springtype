import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";
import {TYPE_UNDEFINED} from "../../lang";

const VALIDATOR_NAME = 'defined';

// decorator @IsDefined
export const IsDefined = () => getParameterValidateDecorator(defined, VALIDATOR_NAME);

export const defined = validatorNameFactory((value: any): boolean => {
    return typeof value !== TYPE_UNDEFINED;
}, VALIDATOR_NAME);
