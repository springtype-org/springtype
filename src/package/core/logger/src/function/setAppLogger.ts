import {LoggerConfig} from "../..";
import {ApplicationContext} from "../../../di";
import {APP_LOGGER} from "../constant/APP_LOGGER";
import {getLoggerImplInstance} from "./getLoggerImplInstance";

export const setAppLogger = (appLoggerConfig: LoggerConfig): void => {
    ApplicationContext.getInstance().set(APP_LOGGER, getLoggerImplInstance(appLoggerConfig));
};
