import {NullPointerError} from "./errors/NullPointerError";
import {UndefinedError} from "./errors/UndefinedError";

export class Objects {
    private constructor() {
    }

    public static requireDefined(value: any, message: string) {
        if (typeof value === 'undefined') {
            throw new UndefinedError(message + ' was undefined');
        }
    }

    public static requireNonNull(value: any, message: string) {
        if (value === null) {
            throw new NullPointerError(message + ' was null');
        }

    }

    public static requireNonNullDefined(value: any, message: string) {
        Objects.requireNonNull(value, message);
        Objects.requireDefined(value, message);
    }

}