import {LogLevel} from "../enum/LogLevel";
import {LogFilterFunction} from "./LogFilterFunction";

export interface LoggerImpl {
    log(...args: Array<any>): void;
    trace(...args: Array<any>): void;
    error(...args: Array<any>): void;
    warn(...args: Array<any>): void;
    debug(...args: Array<any>): void;
    info(...args: Array<any>): void;
    
    setLogLevel(level: LogLevel): void;
    setFilterFunction(filter?: LogFilterFunction): void;
    getLogLevel(): LogLevel;
    getFilterFunction(): LogFilterFunction|undefined;
}