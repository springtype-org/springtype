import {WebApp, Theme, AppLogger, LogLevel} from "../../../src/package/core/index";
import {theme} from "./theme";
import {SudokuComponent} from "./game/SudokuComponent";

@AppLogger({
    level: LogLevel.ERROR
})
@Theme(theme)
@WebApp({
    routes: {
        '': <game-component />
    },
    components: [
        SudokuComponent
    ]
})
export class SudokuApp {}