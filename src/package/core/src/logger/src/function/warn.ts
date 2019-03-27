import {ActiveLogger} from "../ActiveLogger";
import {ApplicationContext} from "../../../di";

export const warn = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(ActiveLogger).warn(...args);
};