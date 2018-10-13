import {NonFatalError, NoSuchElementError} from "./errors";
import {Objects} from "./Objects";
import {TryFailure} from "./TryFailure";
import {TrySuccess} from "./TrySuccess";

export abstract class Try<T>  /*Iterable<T> ,*/ {

    constructor() {
    }

    public static of<T>(callable: () => T): Try<T> {
        Objects.requireNonNullDefined(callable, "callable");
        try {
            const result = callable();
            Objects.requireNonNullDefined(result, "result")
            return new TrySuccess(result);
        } catch (t) {
            return new TryFailure(t);
        }
    }

    public filter(predicate: (value: T) => boolean): Try<T> {
        Objects.requireNonNullDefined(predicate, "predicate");
        if (this.isSuccess()) {
            try {
                const value = this.get();
                if (!predicate(value)) {
                    return new TryFailure(new NoSuchElementError("Predicate does not hold for " + value));
                }
            } catch (e) {
                return new TryFailure(e);
            }
        }
        return this;
    }


    public flatMap<U extends T>(mapper: (value: T) => Try<U>): Try<U> {
        Objects.requireNonNullDefined(mapper, "mapper");
        if (this.isSuccess()) {
            try {
                return mapper(this.get());
            } catch (t) {
                return new TryFailure(t);
            } finally {

            }
        } else {
            return new TryFailure(this.getCause());
        }
    }

    public fold<U>(ifTryFailure: (error: Error) => U, ifSuccess: (value: T) => U): U {
        Objects.requireNonNullDefined(ifTryFailure, "ifTryFailure");
        Objects.requireNonNullDefined(ifSuccess, "ifSuccess");
        return this.isSuccess() ? ifSuccess(this.get()) : ifTryFailure(this.getCause());
    }



    public getOrElse(other: T): T {
        return this.isSuccess() ? this.get() : other;
    }

    public getOrElseGet(supplier: () => T): T {
        Objects.requireNonNullDefined(supplier, "supplier");
        return this.isSuccess() ? this.get() : supplier();
    }

    public getOrElseThrow<X extends Error>(exceptionProvider: (error: Error) => X): T {
        Objects.requireNonNullDefined(exceptionProvider, "exceptionProvider");
        if (this.isSuccess()) {
            return this.get();
        } else {
            throw exceptionProvider(this.getCause());
        }
    }

    public map<U>(mapper: (value: T) => U): Try<U> {
        if (this.isSuccess()) {
            Objects.requireNonNullDefined(mapper, "mapper");
            try {
                return new TrySuccess(mapper(this.get()));
            } catch (t) {
                return new TryFailure(t);
            }
        } else {
            return new TryFailure(this.getCause());
        }
    }


    public mapTryFailure<X extends Error>(mapper: (error: Error) => X): Try<T> {
        if (this.isFailure()) {
            Objects.requireNonNullDefined(mapper, "mapper");
            try {
                return new TryFailure(mapper(this.getCause()));
            } catch (t) {
                return new TryFailure(t);
            }
        } else {
            return this;
        }
    }

    public onTryFailure(action: (error: Error) => void): Try<T> {
        if (this.isFailure()) {
            Objects.requireNonNullDefined(action, "action");
            action(this.getCause());
        }
        return this;
    }

    public onSuccess(action: (value: T) => void): Try<T> {
        if (this.isSuccess()) {
            try {
                Objects.requireNonNullDefined(action, "action is null");
                action(this.get());
            } catch (e) {
                return new TryFailure(e);
            }
        }
        return this;
    }

    public orElse(callable: () => Try<T>): Try<T> {
        if (this.isSuccess()) {
            return this;
        } else {
            try {
                Objects.requireNonNullDefined(callable, "callable");
                return callable();
            } catch (x) {
                return new TryFailure(x);
            }
        }
    }

    public recover(exceptionType: Function, recoveryFunction: () => T): Try<T> {
        Objects.requireNonNullDefined(exceptionType, "exceptionType");
        Objects.requireNonNullDefined(recoveryFunction, "recoveryFunction");
        if (this.isFailure()) {
            if (this.getCause() instanceof exceptionType) {
                return Try.of(() => recoveryFunction());
            }
        }
        return this;
    }

    abstract get(): T;

    abstract getCause(): Error;

    abstract isFailure(): boolean;

    abstract isSuccess(): boolean;
}



