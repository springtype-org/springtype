import {AppLogger, LogLevel, Theme, WebApp} from "../../../src/package/core/index";
import {theme} from "./theme";
import {SudokuComponent} from "./game/SudokuComponent";
import {ROUTE_DEFAULT} from "../../todo-mvc/src/routes";
import {Route} from "../../../src/package/core";

@AppLogger({
    level: LogLevel.ERROR
})
@Theme(theme)
@Route(ROUTE_DEFAULT, SudokuComponent)
export class SudokuApp {}