import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options, validateRequired} from "../ValidateMethod";
import {validate as fromIsString} from "./IsString"


export const Length = (minimum: number = 0, maximum: number, options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () =>
                fromIsString(value) && validate(<string> value, minimum, maximum),
            options)
    );


export const validate = (value: string, minimum: number, maximum: number): boolean => minimum >= 0 && maximum >= minimum && value.length >= minimum && value.length <= maximum;

