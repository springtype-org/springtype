import {Component} from "../package/di";

@Component()
export class Subtractor {

    signed: boolean = false;

    subtract(a: number, b: number) {

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