export class Optional<T> {


    private constructor(private _value: T) {
    }

    public isPresent(): boolean {
        return this._value !== null && this._value !== undefined;
    }

    public then(fun: (value: T) => T): Optional<T> {
        if (this.isPresent()) {
            return Optional.of(fun(this.get()));
        }
        return Optional.none();
    }

    get(): T {
        return this._value;
    }

    getOrElse(_default: T): T {
        if (this.isPresent()) {
            return this.get();
        }
        return _default;
    }

    static of<T>(value: T): Optional<T> {
        return new Optional<T>(value);
    }

    static none(): Optional<any> {
        return new Optional(null);
    }
}
