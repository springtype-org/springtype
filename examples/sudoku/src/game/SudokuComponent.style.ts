import {SudokuComponent} from "./SudokuComponent";
import {HOST_SELECTOR} from "@springtype/springtype-incubator-core";
import {AppTheme} from "../theme";

export default (view: SudokuComponent, theme: AppTheme) => ({

    // or ':host', see https://developer.mozilla.org/en-US/docs/Web/CSS/:host()
    [HOST_SELECTOR]: {
        display: 'block',
        height: '300px',
        width: '300px',
        border: '1px solid #000'
    }
});


