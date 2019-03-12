import {ApplicationContext, ApplicationEnvironment, Logger, LogLevel, Theme} from "../../../src/package/core/index";
import {theme} from "./theme";
import {SudokuComponent} from "./game/SudokuComponent";
import {Route} from "../../../src/package/core";
import {ROUTE_BASE} from "./routes";

@Logger({
    level: process.env.ENVIRONMENT === ApplicationEnvironment.DEV ? LogLevel.LOG : LogLevel.ERROR
})
@Theme(theme)
@Route(ROUTE_BASE, SudokuComponent)
export class SudokuApp {}