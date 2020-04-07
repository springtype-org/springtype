import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";
import {pattern} from "./pattern";

const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const EMAIL = 'email';

// decorator @EMail
export const EMail = () => getParameterValidateDecorator(email, EMAIL);

export const email = validatorNameFactory(
    (value: string): boolean => pattern(EMAIL_REGEX)(value),
    EMAIL
);


