import {setAppLogger} from "../function/setAppLogger";
import {LoggerConfig} from "../interface/LoggerConfig";

export function AppLogger(appLoggerConfig: LoggerConfig): any {

    // called with @AppLogger() or @AppLogger({})
    if (!(typeof appLoggerConfig === 'function')) {

        return (target: any) => {
            setAppLogger(appLoggerConfig);
            return target;
        }
    }
}