import {ApplicationContext} from "../../../di";
import {ActiveLogger} from "../ActiveLogger";

export const log = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(ActiveLogger).log(...args);
};