import {Logger} from "../Logger";
import {ApplicationContext} from "../../../di";

export const info = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(Logger).info(...args);
};