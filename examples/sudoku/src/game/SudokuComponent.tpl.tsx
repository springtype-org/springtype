import {SudokuComponent} from "./SudokuComponent";

export default (view: SudokuComponent) =>
    <div>
       Hier kommt Sudoku hin { view.isActive } und { view.type }
    </div>

