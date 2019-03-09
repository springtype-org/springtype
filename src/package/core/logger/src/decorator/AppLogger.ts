import {setAppLogger} from "../function/setAppLogger";
import {LoggerConfig} from "../interface/LoggerConfig";

export function AppLogger(appLoggerConfig: LoggerConfig): any {

    // called with @AppLogger() or @AppLogger({})
    if (!(typeof appLoggerConfig === 'function')) {

        return (target: any) => {

            console.log('setAppLogger custom');

            setAppLogger(appLoggerConfig);
            return target;
        }
    }
}