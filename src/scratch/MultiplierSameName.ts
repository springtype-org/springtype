import {Bean} from "../package/di";
import {UnresolvableBean} from "./UnresolvableBean";

@Bean()
export class Multiplier {

    constructor(unresolvable: UnresolvableBean) {

        // even this is injected, no matter if UnresolvableBean is @Bean annotated or not
        unresolvable.test();

    }

    multiply(a: number, b: number) {

        return a * (b * 3);
    }
}