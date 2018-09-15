import {baseValidator} from "./Validate";
import * as fromNotNull from "./NotNull";

export function NotEmpty(target: any, propertyKey: string | symbol, parameterIndex: number) {
    baseValidator(target, propertyKey, parameterIndex, {validate: validate});
}

function validate(paramName: string, value: Object) {
    fromNotNull.validate(paramName, value);
    // @ts-ignore
    if (!!value[Symbol.iterator]) {
        // @ts-ignore
        const result = value[Symbol.iterator]();
        if (result.next().done === true) {
            throw new Error(`The ${paramName} is empty.`);
        }
    } else if (typeof value === 'string' && value.length < 1) {
        throw new Error(`Parameter ${paramName} is empty.`);
    } else if (value instanceof String && value.length < 1) {
        throw new Error(`Parameter ${paramName} is empty.`);
    }

}

export class UndefinedError extends Error {

}
