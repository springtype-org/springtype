import {Component} from "../../index";
import {ILogger} from "./ILogger";

@Component
export class ConsoleLogger implements ILogger {

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