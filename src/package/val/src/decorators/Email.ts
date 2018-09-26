import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options} from "../ValidateMethod";
import {validateRequired} from "./Required";
import {validate as fromIsString} from "./IsString"
import {validate as fromPattern} from "./Pattern"


const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


export const Email = (options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => fromIsString(value) && validate(<string> value),
            options)
    );


export const validate = (value: string): boolean=> fromPattern(value,EMAIL_REGEX);
