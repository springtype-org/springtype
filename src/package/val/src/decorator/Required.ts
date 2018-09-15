import "reflect-metadata"
import {baseValidator} from "./Validate";

export function Required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    baseValidator(target, propertyKey, parameterIndex, {validate: validate});
}

function validate(paramName: string, value: Object) {
    console.log(value, "yes :)")
}

