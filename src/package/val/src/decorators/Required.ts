import {baseValidator, Options} from "../Validate";
import {validate as notNullValidate} from "./NotNull";
import {validate as definedValidate} from "./IsDefined";
import {Optional} from "../../../util";


export function Required() {
    return baseValidator(validate)
}

export const validate = (value: any): boolean => {
    return notNullValidate(value) && definedValidate(value)
};

export const validateRequired = (value: any, options: Options): Optional<boolean> => {
    if (options.required === true) {
        return Optional.of(notNullValidate(value) && definedValidate(value));
    }
    return Optional.none();
};
