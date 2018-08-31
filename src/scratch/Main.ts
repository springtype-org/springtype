import {Gain} from "./Gain";
import {BeanFactory} from "../package/di";

let gain: Gain = BeanFactory.getBean("Gain", Gain);

console.log('Gain via DI', gain);