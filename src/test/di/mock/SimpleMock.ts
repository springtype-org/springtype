import {Autowired, Component, Inject} from "../../../package/di";
import {NiceSubtractor} from "../components/NiceSubtractor";
import {Subtractor} from "../components/Subtractor";
import {Multiplier} from "../components/Multiplier";

@Component
export class SimpleMock {

    constructor(
        protected multiplier?: Multiplier
    ) {
    }

    @Autowired
    calc(a: number, b: number, @Inject(NiceSubtractor) subtractor?: Subtractor): number {

        console.log('test calc');

        if (subtractor && this.multiplier) {
            return subtractor.subtract(
                this.multiplier.multiply(a, b), a
            );
        }
        return NaN;
    }
}