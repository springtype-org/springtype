import {ApplicationContext} from "../../../di";
import {Logger} from "../Logger";

export const log = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(Logger).log(...args);
};