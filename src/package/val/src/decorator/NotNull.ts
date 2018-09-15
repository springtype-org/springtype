import {baseValidator} from "./Validate";

export function NotNull(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    baseValidator(target, propertyKey, parameterIndex, {validate: validate});
}

export function validate(paramName: string, value: Object) {
    if(undefined === value){
        throw new Error(`Parameter ${paramName} is null or undefined.`);
    }
}
