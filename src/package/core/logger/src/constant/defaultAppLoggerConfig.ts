import {LoggerConfig} from "../interface/LoggerConfig";
import {LoggerImplType} from "../enum/LoggerImplType";
import {LogLevel} from "../enum/LogLevel";

export const defaultAppLoggerConfig: LoggerConfig = {
    type: LoggerImplType.CONSOLE,
    level: LogLevel.LOG
};