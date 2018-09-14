import {Component} from "../package/di";
import {UnresolvableBean} from "./UnresolvableBean";

@Component()
export class Multiplier {

    constructor(unresolvable: UnresolvableBean) {

        // even this is injected, no matter if UnresolvableBean is @Component annotated or not
        if (!unresolvable) {

            // console.log('Fine, unresolvable class name is injected as', unresolvable);

            //unresolvable.test();
        }

    }

    multiply(a: number, b: number) {

        return a * b;
    }
}