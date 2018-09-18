import {Gain} from "./Gain";
import {BeanFactory} from "../package/di";
import {Corrupt} from "./Corrupt";
import {PrintValidator, ValidationConfigurator} from "../package/val";

let gain: Gain = BeanFactory.getBean(Gain);
let corrupt: Corrupt = BeanFactory.getBean(Corrupt);

console.log('Gain via DI', gain);

gain.testInject();

ValidationConfigurator.active = BeanFactory.getBean(PrintValidator);

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