import {getAppLogger} from "./getAppLogger";
import {LoggerImpl} from "../interface/LoggerImpl";
import {Logger} from "../Logger";
import {ApplicationContext} from "../../../di";

export const warn = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(Logger).warn(...args);
};