import {Gain} from "./Gain";
import {ApplicationContext} from "../package/di";

let gain: Gain = ApplicationContext.getInstance().getBean(Gain);

console.log('Gain via DI', gain);

gain.testInject();