import {Bean, Inject, InjectBeanFactory, BeanMethod} from "../package/di";
import {Multiplier} from "./Multiplier";
import {Subtractor} from "./Subtractor";
import {UnresolvableBean} from "./UnresolvableBean";

class CustomLocalMultiplierFactory implements InjectBeanFactory {

    factory() {

        console.log('Using CustomLocalMultiplierFactory to produce Multiplier bean...');

        return new Multiplier(new UnresolvableBean());
    }
}

@Bean()
export class Gain {

    // default injection strategy is: InjectionStrategy.SINGLETON
    // this example demonstrates to override this behavior by using @Inject(...)
    constructor(

        // overrides the default singleton injection strategy and injects a new instance instead (via BeanFactory)
        // optional, e.g. using InjectionProfile to inject a mock impl. instead
        // @Inject(Multiplier, InjectionProfile.TEST)
        @Inject(Multiplier)
        protected multiplier: Multiplier,

        // overrides the default injection strategy and injects an arbitrary value instead
        // can be a scalar value, union type or even expression result value
        @Inject(new Subtractor().setSigned())
        protected subtractor: Subtractor

    ) {

        console.log('Multiplication result: ', multiplier.multiply(4, 9));
        console.log('Subtraction result:', subtractor.subtract(3, 5));
    }

    // @BeanMethod allows any method in any arbitrary class to @Inject parameters
    @BeanMethod
    testInject(

        // Use some InjectBeanFactory to create the instance to inject
        @Inject(CustomLocalMultiplierFactory)
        anotherMultiplier?: Multiplier
    ) {

        console.log('testInject anotherMultiplier', anotherMultiplier);
    }
}