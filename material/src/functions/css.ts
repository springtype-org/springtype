import {ISelection} from "../interfaces/ISelection";
import {selection} from "./selection";

export const css = (selectionList: ISelection): string => {
    return selection(selectionList).join('; ');
};