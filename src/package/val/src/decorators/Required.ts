import {baseValidator} from "../Validate";
import * as fromNotNull from "./NotNull";
import * as fromDefined from "./Defined";


export function Required() {
    return baseValidator(validate)
}

export const validate = (value: any): boolean => {
    return fromNotNull.validate(value) && fromDefined.validate(value)
};

