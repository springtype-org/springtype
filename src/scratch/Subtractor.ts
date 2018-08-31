import {Bean} from "../package/di";

@Bean()
export class Subtractor {

    subtract(a: number, b: number) {
        return a - b;
    }
}