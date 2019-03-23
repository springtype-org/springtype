import {
    ApplicationContext,
    ApplicationEnvironment,
    Logger,
    LogLevel,
    Theme,
    UseElement
} from "../../../src/package/core/index";
import {theme} from "./theme";
import {SudokuComponent} from "./game/SudokuComponent";
import {Route} from "../../../src/package/core";
import {ROUTE_BASE} from "./routes";

@Logger({
    level: process.env.ENVIRONMENT === ApplicationEnvironment.DEV ? LogLevel.LOG : LogLevel.ERROR
})
@Theme(theme)
@UseElement(SudokuComponent)
export class SudokuApp {}