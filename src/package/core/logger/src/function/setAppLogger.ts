import {LoggerConfig} from "../..";
import {ApplicationContext} from "../../../di";
import {APP_LOGGER} from "../constant/APP_LOGGER";
import {getLoggerImplInstance} from "./getLoggerImplInstance";

export const setAppLogger = (appLoggerConfig: LoggerConfig): void => {

    const logger = getLoggerImplInstance(appLoggerConfig);
    console.log('setAppLogger(appLoggerConfig)', logger);

    ApplicationContext.getInstance().setResource(APP_LOGGER, logger);
};
