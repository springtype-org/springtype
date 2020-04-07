import {validatorNameFactory} from "../function/validator-name-factory";
import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {special} from "./special";

export const UPPERCASE ='uppercase';

export const Uppercase = () => getParameterValidateDecorator(special, UPPERCASE);

export const uppercase = validatorNameFactory((value: string): boolean => {
    return /[A-Z]/.test(value);
}, UPPERCASE);
