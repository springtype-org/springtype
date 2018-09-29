import {Simple} from "./Simple";
import {ApplicationContext} from "../package/di";
import {InjectionProfile, InjectionStrategy} from "../package/di/src/BeanFactory";

let simple = ApplicationContext.getInstance().getBean(Simple, InjectionProfile.DEFAULT, InjectionStrategy.NEW);
let simple2 = ApplicationContext.getInstance().getBean(Simple, InjectionProfile.DEFAULT, InjectionStrategy.NEW);

if (simple === simple2) {
    throw new Error('NEW does NOT work.');
}

let result = simple.calc(7, 7);

console.log('Can calc', result);

let singletonSimple = ApplicationContext.getInstance().getBean(Simple);

if (simple === singletonSimple || simple2 === singletonSimple) {
    throw new Error('NEW and SINGLETON together does NOT work.');
}