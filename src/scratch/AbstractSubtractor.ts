import {Subtractor} from "./Subtractor";

export abstract class AbstractSubtractor {

    signed: boolean = false;

    subtract(a: number, b: number): number {

        if (this.signed) {
            return 1 - (a - b);
        }
        return a - b;
    }

    setSigned(): Subtractor {
        this.signed = true;
        return this;
    }
}