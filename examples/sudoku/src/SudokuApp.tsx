import {ApplicationEnvironment, Logger, LogLevel, Theme, UseElement} from "../../../src/package/core/index";
import {theme} from "./theme";
import {SudokuComponent} from "./game/SudokuComponent";

@Logger({
    level: process.env.ENVIRONMENT === ApplicationEnvironment.DEV ? LogLevel.LOG : LogLevel.ERROR
})
@Theme(theme)
@UseElement(SudokuComponent)
export class SudokuApp {}