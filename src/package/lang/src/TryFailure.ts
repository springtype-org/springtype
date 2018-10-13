import {NonFatalError} from "./errors";
import {Try} from "./Try";

export class TryFailure<T> extends Try<T> {

    constructor(private cause: Error) {
        super();
    }

    public get(): T {
        throw new NonFatalError(this.cause);
    }

    public getCause(): Error {
        return this.cause;
    }

    public isFailure(): boolean {
        return true;
    }

    public isSuccess(): boolean {
        return false;
    }

    public toString(): string {
        return "Failure(" + this.cause + ")";
    }

}
