import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options, validateRequired} from "../ValidateMethod";
import {validate as fromIsString} from "./IsString"
import {validate as fromIPv4} from "./IPv4"
import {validate as fromIPv6} from "./IPv6"

export const IP = (options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => fromIsString(value) && validate(<string> value),
            options)
    );


export const validate = (value: string): boolean => (fromIPv4(<string> value) || fromIPv6(<string> value));


