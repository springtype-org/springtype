import {ApplicationContext} from "../../package/di";
import {Simple} from "../Simple";
import {InjectionProfile} from "../../package/di/src/BeanFactory";


let simple = ApplicationContext.getInstance().getBean(Simple, InjectionProfile.TEST);
let result = simple.calc(7, 7);

console.log('result', result); // 42