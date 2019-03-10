import {Logger} from "../Logger";
import {ApplicationContext} from "../../../di";

export const trace = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(Logger).trace(...args);
};