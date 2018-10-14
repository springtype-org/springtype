import {ILogger} from "./ILogger";
import {ApplicationContext, Component} from "../../di/index";

@Component
export class WebAppLogger implements ILogger {

    protected _webAppLogger!: ILogger;

    get webAppLogger(): ILogger {

        if (this._webAppLogger) return this._webAppLogger;

        const appLogger = ApplicationContext.getInstance().getWebAppConfig().logger;

        if (appLogger) {
            this._webAppLogger = appLogger;
        }
        return this._webAppLogger;
    }

    log(...args: Array<any>): void {
        this.webAppLogger.log(...args);
    }

    trace(...args: Array<any>): void {
        this.webAppLogger.trace(...args);
    }

    error(...args: Array<any>): void {
        this.webAppLogger.error(...args);
    }

    warn(...args: Array<any>): void {
        this.webAppLogger.warn(...args);
    }

    debug(...args: Array<any>): void {
        this.webAppLogger.debug(...args);
    }

    info(...args: Array<any>): void {
        this.webAppLogger.info(...args);
    }
}