import {AppLogger, LogLevel, Theme} from "../../../src/package/core/index";
import {theme} from "./theme";
import {SudokuComponent} from "./game/SudokuComponent";
import {Route} from "../../../src/package/core";
import {ROUTE_BASE} from "./routes";

@AppLogger({
    level: LogLevel.LOG
})
@Theme(theme)
@Route(ROUTE_BASE, SudokuComponent)
export class SudokuApp {}