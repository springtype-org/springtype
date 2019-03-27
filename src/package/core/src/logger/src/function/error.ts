import {ActiveLogger} from "../ActiveLogger";
import {ApplicationContext} from "../../../di";

export const error = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(ActiveLogger).error(...args);
};