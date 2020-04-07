import {validatorNameFactory} from "../function/validator-name-factory";
import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";

export const SPECIAL = 'special';

export const Special = () => getParameterValidateDecorator(special, SPECIAL);

export const special = validatorNameFactory((value: string): boolean => {
    return /[-!$%^&*()_|~`{}\[\]:\/;<>?,.@#'"]/.test(value) || value.indexOf('\\') >= 0;
}, SPECIAL);
