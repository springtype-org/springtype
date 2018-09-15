import {Gain} from "./Gain";
import {BeanFactory} from "../package/di";
import {Corrupt} from "./Corrupt";

let gain: Gain = BeanFactory.getBean(Gain);
let corrupt: Corrupt = BeanFactory.getBean(Corrupt);

console.log('Gain via DI', gain);

gain.testInject();

corrupt.checkMe(new String());
