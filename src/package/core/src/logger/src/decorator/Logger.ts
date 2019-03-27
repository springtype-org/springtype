import {setLogger} from "../function/setLogger";
import {LoggerConfig} from "../interface/LoggerConfig";

export function Logger(loggerConfig: LoggerConfig): any {

    // called with @AppLogger() or @AppLogger({})
    if (!(typeof loggerConfig === 'function')) {

        return (target: any) => {
            setLogger(loggerConfig);
            return target;
        }
    }
}