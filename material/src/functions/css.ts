export const css = (selectionList: { [key: string]: boolean }): string => {
    if(!selectionList){
        return '';
    }
    const classList: string[] = [];
    for (const classKey of Object.keys(selectionList)) {
        if (selectionList[classKey]) {
            classList.push(classKey)
        }
    }
    return classList.join('; ');
};