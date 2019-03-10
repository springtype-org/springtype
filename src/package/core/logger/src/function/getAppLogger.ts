import {APP_LOGGER} from "../constant/APP_LOGGER";
import {ApplicationContext} from "../../../di";
import {LoggerImpl} from "../interface/LoggerImpl";
import {defaultAppLoggerConfig} from "../constant/defaultAppLoggerConfig";
import {setAppLogger} from "./setAppLogger";

export const getAppLogger = (): LoggerImpl => {

    let loggerImpl = ApplicationContext.getInstance().get(APP_LOGGER);

    if (!loggerImpl) {
        setAppLogger(defaultAppLoggerConfig);
    }
    return ApplicationContext.getInstance().get(APP_LOGGER);
};
