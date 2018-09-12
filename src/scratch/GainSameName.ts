import {Bean} from "../package/di";
import {Multiplier} from "./MultiplierSameName";
import {Subtractor} from "./Subtractor";

@Bean()
export class Gain {

    constructor(
        protected multiplier: Multiplier,
        protected subtractor: Subtractor
    ) {

        console.log('Multiplication result (same name, different impl.): ', multiplier.multiply(4, 9));
        console.log('Subtraction result:', subtractor.subtract(3, 5));
    }
}