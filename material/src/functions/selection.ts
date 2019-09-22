import {ISelection} from "../interfaces/ISelection";

export const selection =(selectionList: ISelection): string[] => {
    const classList: string[] = [];
    if (!selectionList) {
        return classList;

    }
    for (const classKey of Object.keys(selectionList)) {
        if (selectionList[classKey]) {
            classList.push(classKey)
        }
    }
    return classList;
}