import {Bean} from "../package/di";
import {Multiplier} from "./Multiplier";
import {Subtractor} from "./Subtractor";

@Bean()
export class Gain {

    constructor(
        protected multiplier: Multiplier,
        protected subtractor: Subtractor
    ) {

        console.log('Multiplication result: ', multiplier.multiply(4, 9));
        console.log('Subtraction result:', subtractor.subtract(3, 5));
    }
}