import {ISelection} from "../interfaces/ISelection";
import {selection} from "./selection";

export const classes = (selectionList: ISelection): string => {
    return selection(selectionList).join(' ');
};