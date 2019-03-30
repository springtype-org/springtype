import {LogLevel} from "../..";
import {getLogLevelSeverity} from "./getLogLevelSeverity";

export const filterByLogLevel = (args: Array<any>, logLevel: LogLevel, methodLogLevel: LogLevel): Array<any> => {

    const loggingSeverity = getLogLevelSeverity(logLevel);
    const actualMethodSeverity = getLogLevelSeverity(methodLogLevel);

    // numb logging output because e.g. method severity (log() = LOG = 4 is lower than logging severity set (ERROR = 1)
    if (actualMethodSeverity > loggingSeverity) {
        return [];
    }
    return args;
}