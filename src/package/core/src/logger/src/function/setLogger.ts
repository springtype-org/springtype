import {LoggerConfig} from "../..";
import {ApplicationContext} from "../../../di";
import {LOGGER} from "../constant/LOGGER";
import {getLoggerImplInstance} from "./getLoggerImplInstance";

export const setLogger = (appLoggerConfig: LoggerConfig): void => {
    ApplicationContext.getInstance().set(LOGGER, getLoggerImplInstance(appLoggerConfig));
};
