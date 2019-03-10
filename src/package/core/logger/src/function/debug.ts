import {Logger} from "../Logger";
import {ApplicationContext} from "../../../di";

export const debug = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(Logger).debug(...args);
};