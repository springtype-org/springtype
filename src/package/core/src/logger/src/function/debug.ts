import {ActiveLogger} from "../ActiveLogger";
import {ApplicationContext} from "../../../di";

export const debug = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(ActiveLogger).debug(...args);
};