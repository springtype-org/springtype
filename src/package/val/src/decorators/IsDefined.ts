import {baseValidator} from "../Validate";

export function IsDefined() {
    return baseValidator(validate)
}
export const validate = (value: any): boolean => {
    return value !== undefined
};

