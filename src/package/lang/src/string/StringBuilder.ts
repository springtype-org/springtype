/**
 * This class optimize string builder
 * concat is very slow
 */
export class StringBuilder {
    private strings: string[];

    /**
     * @param length length of how many segments it will have minimum
     */
    constructor(private length?: number) {
        this.strings = new Array(length);
    }

    /**
     * Append a new value
     * @param value the string you want to append
     */
    append(value: string): StringBuilder {
        this.strings.push(value);
        return this;
    }

    /**
     * Clears the string builder
     */
    clear(): void {
        this.strings = new Array(this.length);
    }

    /**
     * Return the joined string
     */
    toString(): string{
        return this.strings.join();
    }

}

