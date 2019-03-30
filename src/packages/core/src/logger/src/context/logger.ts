import {ApplicationContext} from "../../../di";
import {LoggerImpl} from "../interface/LoggerImpl";
import {defaultLoggerConfig} from "../defaultLoggerConfig";
import {getLoggerImplInstance} from "../function/getLoggerImplInstance";
import {LoggerConfig} from "../..";

const LOGGER = 'LOGGER';

export const getLogger = (): LoggerImpl => {

    let loggerImpl = ApplicationContext.getInstance().get(LOGGER);

    if (!loggerImpl) {
        setLogger(defaultLoggerConfig);
    }
    return ApplicationContext.getInstance().get(LOGGER);
};

export const setLogger = (appLoggerConfig: LoggerConfig): void => {
    ApplicationContext.getInstance().set(LOGGER, getLoggerImplInstance(appLoggerConfig));
};

