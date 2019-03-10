import {LoggerImpl} from "./interface/LoggerImpl";
import {Component} from "../../di";
import {getAppLogger} from "./function/getAppLogger";
import {LogFilterFunction} from "./interface/LogFilterFunction";
import {LogLevel} from "./enum/LogLevel";
import {filterByLogLevel} from "./function/filterByLogLevel";

/**
 * Logger to inject which uses the decorator-provided application logger (@AppLogger(...))
 * or falls back to the default configuration (default/DefaultAppLoggerConfig.ts).
 *
 * Inject this Logger in any class using:
 *
 * constructor(protected logger: Logger) { ... }
 */
@Component
export class Logger implements LoggerImpl {

    protected _loggerImpl!: LoggerImpl;

    private filterArgs(args: Array<any>, methodLogLevel: LogLevel): Array<any> {

        let filteredArgs = filterByLogLevel(args, this.getLogLevel(), methodLogLevel);
        const customFilterFn = this.getFilterFunction();

        if (typeof customFilterFn === 'function') {
            filteredArgs = customFilterFn(filteredArgs);
        }
        return filteredArgs;
    }

    get loggerImpl(): LoggerImpl {

        // fetch cached instance
        if (this._loggerImpl) return this._loggerImpl;

        const appLoggerImpl = getAppLogger();

        if (appLoggerImpl) {
            this._loggerImpl = appLoggerImpl;
        }
        return this._loggerImpl;
    }

    log(...args: Array<any>): void {

        const filteredArgs = this.filterArgs(args, LogLevel.LOG);

        if (filteredArgs.length) {
            this.loggerImpl.log(...filteredArgs);
        }
    }

    trace(...args: Array<any>): void {

        const filteredArgs = this.filterArgs(args, LogLevel.TRACE);

        if (filteredArgs.length) {
            this.loggerImpl.trace(...filteredArgs);
        }
    }

    error(...args: Array<any>): void {

        const filteredArgs = this.filterArgs(args, LogLevel.ERROR);

        if (filteredArgs.length) {
            this.loggerImpl.error(...filteredArgs);
        }
    }

    warn(...args: Array<any>): void {

        const filteredArgs = this.filterArgs(args, LogLevel.WARN);

        if (filteredArgs.length) {
            this.loggerImpl.warn(...filteredArgs);
        }
    }

    debug(...args: Array<any>): void {

        const filteredArgs = this.filterArgs(args, LogLevel.DEBUG);

        if (filteredArgs.length) {
            this.loggerImpl.debug(...filteredArgs);
        }
    }

    info(...args: Array<any>): void {

        const filteredArgs = this.filterArgs(args, LogLevel.INFO);

        if (filteredArgs.length) {
            this.loggerImpl.info(...filteredArgs);
        }
    }

    setLogLevel(level: LogLevel): void {
        this.loggerImpl.setLogLevel(level);
    }

    setFilterFunction(filter?: LogFilterFunction): void {
        this.setFilterFunction(filter);
    }

    getLogLevel(): LogLevel {
        return this.loggerImpl.getLogLevel();
    }

    getFilterFunction(): LogFilterFunction|undefined {
        return this.loggerImpl.getFilterFunction();
    };
}