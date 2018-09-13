import {Gain} from "./Gain";
import {BeanFactory} from "../package/di";

let gain: Gain = BeanFactory.getBean(Gain);

console.log('Gain via DI', gain);

gain.testInject();