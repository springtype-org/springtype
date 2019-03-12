import {ActiveLogger} from "../ActiveLogger";
import {ApplicationContext} from "../../../di";

export const trace = (...args: Array<any>) => {
    ApplicationContext.getInstance().getBean(ActiveLogger).trace(...args);
};