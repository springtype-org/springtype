import {UnresolvableBean} from "../helper/UnresolvableBean";
import {Component} from "@springtype/core";

@Component
export class MultiplierMock {

    constructor(unresolvable: UnresolvableBean) {

        // even this is injected, no matter if UnresolvableBean is @Component annotated or not
        if (!unresolvable) {

            //log.log('Fine, unresolvable class name is injected as', unresolvable);

            //unresolvable.test();
        }

    }

    multiply(a: number, b: number) {

        console.log('test multiply');
        return a * b;
    }
}