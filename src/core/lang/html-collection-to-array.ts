export const htmlCollectionToArray = <HTML_TYPE extends HTMLElement>(collection: HTMLCollectionBase): Array<HTML_TYPE> => {
    const result: Array<HTML_TYPE> = [];
    for (let i = 0; i < collection.length; i++) {
        const item = collection.item(i);
        if (item) {
            result.push(item as HTML_TYPE);
        }
    }
    return result;
};