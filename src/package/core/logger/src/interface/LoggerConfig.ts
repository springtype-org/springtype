import {LoggerImplType} from "../enum/LoggerImplType";
import {LogLevel} from "../enum/LogLevel";
import {LogFilterFunction} from "./LogFilterFunction";

export interface LoggerConfig {
    type?: LoggerImplType;
    level?: LogLevel;
    filter?: LogFilterFunction;
}