import {LoggerConfig} from "../interface/LoggerConfig";
import {setLogger} from "../context/logger";

export function Logger(loggerConfig: LoggerConfig): any {

    // called with @AppLogger() or @AppLogger({})
    if (!(typeof loggerConfig === 'function')) {

        return (target: any) => {
            setLogger(loggerConfig);
            return target;
        }
    }
}