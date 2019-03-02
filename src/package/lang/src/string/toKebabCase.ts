export const toKebabCase = (text: string): string => {
    return text
        // get all lowercase letters located next to uppercase ones
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        // replace all spaces and low dashes
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
};