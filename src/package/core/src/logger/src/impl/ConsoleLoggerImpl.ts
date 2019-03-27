import {Component} from "../../../di/index";
import {LoggerImpl} from "../interface/LoggerImpl";
import {LogLevel} from "../enum/LogLevel";
import {LogFilterFunction} from "../interface/LogFilterFunction";

@Component
export class ConsoleLoggerImpl implements LoggerImpl {

    private level!: LogLevel;
    private filter!: LogFilterFunction|undefined;
    
    setLogLevel(level: LogLevel) {
        this.level = level;
    }

    setFilterFunction(filter?: LogFilterFunction) {
        this.filter = filter;
    }

    getLogLevel(): LogLevel {
        return this.level;
    }
    getFilterFunction(): LogFilterFunction|undefined {
        return this.filter;
    };
    
    log(...args: Array<any>): void {
        console.log(...args);
    }

    trace(...args: Array<any>): void {
        console.trace(...args);
    }

    error(...args: Array<any>): void {
        console.error(...args);
    }

    warn(...args: Array<any>): void {
        console.warn(...args);
    }

    debug(...args: Array<any>): void {
        console.debug(...args);
    }

    info(...args: Array<any>): void {
        console.info(...args);
    }
}