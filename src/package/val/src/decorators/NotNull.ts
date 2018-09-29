import {baseValidator} from "../Validate";

export function NotNull() {
    return baseValidator(validate)
}

export const validate = (value: any): boolean => {
    return null !== value;
};