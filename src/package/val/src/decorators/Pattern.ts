import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options} from "../ValidateMethod";
import {validateRequired} from "./Required";
import {validate as fromIsString} from "./IsString";

export const Pattern = (regex: RegExp, options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => fromIsString(value) && validate(<string> value,regex),
            options)
    );


export const validate = (value: string, regex: RegExp): boolean => {
    const results = regex.exec(value);
    if (null == results || results.length == 0) {
        return false;
    }
    return results[0] === value;
};
