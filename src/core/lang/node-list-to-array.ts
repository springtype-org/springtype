export const nodeListToArray = <HTML_TYPE extends HTMLElement>(nodeList: NodeList): Array<HTML_TYPE> => {
    const result: Array<HTML_TYPE> = [];
    for (let i = 0; i < nodeList.length; i++) {
        const item = nodeList.item(i);
        if (item) {
            result.push(item as HTML_TYPE);
        }
    }
    return result;
};