import {Bean} from "../package/di";
import {Multiplier} from "./MultiplierSameName";
import {Multiplier as MultiplierSameName} from "./MultiplierSameName";
import {Multiplier as MultiplierOriginal} from "./Multiplier";
import {Subtractor} from "./Subtractor";

@Bean()
export class Gain {

    constructor(
        protected multiplier: Multiplier,
        protected multiplierSameName: MultiplierSameName,
        protected multiplierOriginal: MultiplierOriginal,
        protected subtractor: Subtractor
    ) {

        console.log('Multiplication result (same name, different impl.): ', multiplier.multiply(4, 9));
        console.log('Multiplication result (same name, explicitly fetched.): ', multiplierSameName.multiply(4, 9));
        console.log('Multiplication result (same name, original.): ', multiplierOriginal.multiply(4, 9));
        console.log('Subtraction result:', subtractor.subtract(3, 5));
    }
}