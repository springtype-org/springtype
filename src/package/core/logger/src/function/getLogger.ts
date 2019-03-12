import {LOGGER} from "../constant/LOGGER";
import {ApplicationContext} from "../../../di";
import {LoggerImpl} from "../interface/LoggerImpl";
import {defaultLoggerConfig} from "../constant/defaultLoggerConfig";
import {setLogger} from "./setLogger";

export const getLogger = (): LoggerImpl => {

    let loggerImpl = ApplicationContext.getInstance().get(LOGGER);

    if (!loggerImpl) {
        setLogger(defaultLoggerConfig);
    }
    return ApplicationContext.getInstance().get(LOGGER);
};
