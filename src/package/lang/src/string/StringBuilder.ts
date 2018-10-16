export class StringBuilder {
    private strings: string[];

    constructor(private length?: number) {
        this.strings = new Array(length);
    }

    append(value: string): StringBuilder {
        this.strings.push(value);
        return this;
    }

    clear(): void {
        this.strings = new Array(this.length);
    }

    toString() {
        return this.strings.join();
    }

}

