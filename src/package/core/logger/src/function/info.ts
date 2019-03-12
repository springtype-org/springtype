import {ActiveLogger} from "../ActiveLogger";
import {ApplicationContext} from "../../../di";

export const info = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(ActiveLogger).info(...args);
};