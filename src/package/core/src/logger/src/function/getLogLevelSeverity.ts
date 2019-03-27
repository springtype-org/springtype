import {LogLevel} from "../..";

export const getLogLevelSeverity = (logLevel: LogLevel): number => {
    switch (logLevel) {
        case LogLevel.NONE:
            return 0;
        case LogLevel.ERROR:
            return 1;
        case LogLevel.WARN:
            return 2;
        case LogLevel.DEBUG:
            return 3;
        default:
        case LogLevel.LOG:
            return 4;
        case LogLevel.INFO:
            return 5;
        case LogLevel.TRACE:
            return 6;
    }
};