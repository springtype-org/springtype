import {Optional} from "./Optional";

export class Try<T> {

    constructor(private fun: () => T) {
    }

    public getOrElse(defaultValue: T): T {
        try{
            return this.fun();
        }
        catch(e){
            return defaultValue;
        }
    }

    public get(): Optional<T> {
        try{
            return Optional.of(this.fun());
        }
        catch(e){
            return Optional.none();
        }
    }

    static of<T>(fun: () => T): Try<T> {
        return new Try<T>(fun);
    }
}