import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options} from "../ValidateMethod";
import {validateRequired} from "./Required";
import {validate as fromIsString} from "./IsString"
import {validate as fromIPv4} from "./IPv4"
import {validate as fromIPv6} from "./IPv6"




export const IPv4 = (options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => fromIsString(value) && (fromIPv4(<string> value) || fromIPv6(<string> value)),
            options)
    );


