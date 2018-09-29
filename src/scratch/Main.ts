import {Gain} from "./Gain";
import {ApplicationContext} from "../package/di";
import {Corrupt} from "./Corrupt";

let gain: Gain = ApplicationContext.getInstance().getBean(Gain);
let corrupt: Corrupt = ApplicationContext.getInstance().getBean(Corrupt);

console.log('Gain via DI', gain);

gain.testInject();

corrupt.checkMe(new String());
