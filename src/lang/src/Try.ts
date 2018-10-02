import {Optional} from "./Optional";

export class Try<T> {

    constructor(private fun: () => T) {
    }

    static of<T>(fun: () => T): Try<T> {
        return new Try<T>(fun);
    }

    public getOrElse(defaultValue: T): T {
        try {
            return this.fun();
        }
        catch (e) {
            return defaultValue;
        }
    }

    public get(): T {
        return this.fun();
    }

    public toOption(): Optional<T> {
        try {
            return Optional.of(this.fun());
        }
        catch (e) {
            return Optional.none();
        }
    }
}