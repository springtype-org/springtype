import {Logger} from "../Logger";
import {ApplicationContext} from "../../../di";

export const warn = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(Logger).warn(...args);
};