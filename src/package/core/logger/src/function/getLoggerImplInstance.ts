import {LoggerImpl} from "../interface/LoggerImpl";
import {LoggerConfig} from "../..";
import {ConsoleLoggerImpl} from "../impl/ConsoleLoggerImpl";
import {LoggerImplType} from "../enum/LoggerImplType";

export const getLoggerImplInstance = (loggerConfig: LoggerConfig): LoggerImpl => {

    let loggerImpl: LoggerImpl;

    switch (loggerConfig.type) {

        default:
        case LoggerImplType.CONSOLE:
            loggerImpl = new ConsoleLoggerImpl();
            break;
    }

    loggerImpl.setLogLevel(loggerConfig.level!);
    loggerImpl.setFilterFunction(loggerConfig.filter);

    return loggerImpl;
};