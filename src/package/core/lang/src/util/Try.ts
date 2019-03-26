export abstract class Try<T> {

    private static requireNonNullDefined<T>(value: T, message: string): T {
        if (typeof value === 'undefined') {
            throw new UndefinedError(message + ' was undefined');
        }
        if (value === null) {
            throw new NullPointerError(message + ' was null');
        }
        return value;
    }

    public static of<T>(callable: () => T): Try<T> {
        try {
            const result = callable();
            Try.requireNonNullDefined(result, "result");
            return new TrySuccess(result);
        } catch (t) {
            return new TryFailure(t);
        }
    }

    public filter(predicate: (value: T) => boolean): Try<T> {
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


    public flatMap<U extends T>(mapper: (value: T) => U): Try<U> {
        if (this.isSuccess()) {
            try {
                return Try.of(() => mapper(this.get()));
            } catch (t) {
                return new TryFailure(t);
            } finally {

            }
        } else {
            return new TryFailure(this.getCause());
        }
    }

    public fold<U>(ifTryFailure: (error: Error) => U, ifSuccess: (value: T) => U): U {
        return this.isSuccess() ? ifSuccess(this.get()) : ifTryFailure(this.getCause());
    }


    public getOrElse(other: T): T {
        return this.isSuccess() ? this.get() : other;
    }

    public getOrElseGet(supplier: () => T): T {
        return this.isSuccess() ? this.get() : supplier();
    }

    public getOrElseThrow<X extends Error>(exceptionProvider: (error: Error) => X): T {
        if (this.isSuccess()) {
            return this.get();
        } else {
            throw exceptionProvider(this.getCause());
        }
    }

    public map<U>(mapper: (value: T) => U): Try<U> {
        if (this.isSuccess()) {
            try {
                return new TrySuccess(mapper(this.get()));
            } catch (t) {
                return new TryFailure(t);
            }
        } else {
            return new TryFailure(this.getCause());
        }
    }


    public mapFailure<X extends Error>(mapper: (error: Error) => X): Try<T> {
        if (this.isFailure()) {
            try {
                return new TryFailure(mapper(this.getCause()));
            } catch (t) {
                return new TryFailure(t);
            }
        } else {
            return this;
        }
    }

    public onFailure(action: (error: Error) => void): Try<T> {
        if (this.isFailure()) {
            action(this.getCause());
        }
        return this;
    }

    public onSuccess(action: (value: T) => void): Try<T> {
        if (this.isSuccess()) {
            try {
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
                return callable();
            } catch (x) {
                return new TryFailure(x);
            }
        }
    }

    public recover(exceptionType: Function, recoveryFunction: () => T): Try<T> {
        if (this.isFailure()) {
            if ((<any>this.getCause()).constructor === exceptionType) {
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

class TrySuccess<T> extends Try<T> {
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

class TryFailure<T> extends Try<T> {

    constructor(private cause: Error) {
        super();
    }

    public get(): T {
        throw this.cause;
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

export class NullPointerError extends Error {
    constructor(message?: string) {
        super(message);
        (<any> this).__proto__ = NullPointerError.prototype;
    }
}

export class UndefinedError extends Error {
    constructor(message?: string) {
        super(message);
        (<any> this).__proto__ = UndefinedError.prototype;
    }
}


export class NoSuchElementError extends Error {
    constructor(message?: string) {
        super(message);
        (<any> this).__proto__ = NoSuchElementError.prototype;
    }
}

export class UnsupportedOperationError extends Error {
    constructor(message?: string) {
        super(message);
        (<any> this).__proto__ = UnsupportedOperationError.prototype;
    }
}