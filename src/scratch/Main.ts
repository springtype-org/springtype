import {Gain} from "./Gain";
import {ApplicationContext} from "../package/di";
import {Corrupt} from "./Corrupt";

let gain: Gain = ApplicationContext.getInstance().getBean(Gain);
let corrupt: Corrupt = ApplicationContext.getInstance().getBean(Corrupt);

console.log('Gain via DI', gain);

gain.testInject();

corrupt.undefined('test');
corrupt.undefined();
corrupt.notNull(1);
corrupt.notNull();
corrupt.notNull(null);
corrupt.notEmpty([null]);
corrupt.notEmpty(null);
corrupt.notEmpty(undefined);
corrupt.notEmpty(['SpringType', null]);
corrupt.notEmptyAll(['SpringType', 2]);
corrupt.notEmptyAll(['SpringType', null]);
corrupt.required(1);
corrupt.required(null);
corrupt.required();
corrupt.min(-0);
corrupt.min(-1);
corrupt.max(3);
corrupt.max(2);
corrupt.range(2);
corrupt.range(3);
corrupt.range(1);
corrupt.range(4);