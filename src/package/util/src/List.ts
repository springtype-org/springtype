import {Optional} from "./Optional";

export class List<T> {

    private readonly array: T[];

    private constructor(array: T[]) {
        this.array = array || [];
    }

    public add(value: T): List<T> {
        return List.of([...this.array].concat(value));
    }

    public find(contain: T): Optional<T> {
        let found = this.array.find((value) => value === contain);
        if (found === undefined) {
            return Optional.none();
        }
        return Optional.of(found);
    }

    public contains(value: T): boolean {
        return this.find(value).isPresent();
    }

    public map<M>(fun: () => M): M[] {
        return this.array.map(fun);
    }

    public forEach(fun: (value: T, index: number, array: T[]) => void): void {
        this.array.forEach(fun);
    }

    public toArray(): T[] {
        return [...this.array];
    }

    static of<T>(array: T[]): List<T> {
        return new List<T>(array);
    }
}