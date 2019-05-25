import {ApplicationContext, InjectionProfile} from "@springtype/core";
import {Simple} from "../components/Simple";


let simple = ApplicationContext.getInstance().getBean(Simple, InjectionProfile.TEST);
let result = simple.calc(7, 7);

console.log('result', result); // 42