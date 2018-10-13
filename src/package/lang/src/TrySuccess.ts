import {UnsupportedOperationError} from "./errors";
import {Try} from "./Try";

export class TrySuccess<T> extends Try<T> {
    constructor(private value: T) {
        super()
    }

    public get(): T {
        return this.value;
    }

    public getCause(): Error {
        throw new UnsupportedOperationError("getCause() on Success");
    }

    public isFailure(): boolean {
        return false;
    }

    public isSuccess(): boolean {
        return true;
    }

    public toString(): string {
        return "Success(" + this.value + ")";
    }
}