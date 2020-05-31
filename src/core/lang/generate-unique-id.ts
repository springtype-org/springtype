const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

/**
 * This method generates unique ids for html
 * an html id can not start with an number
 *
 * unique id only contain alpha lower and uppercase
 * characters and it.
 */
export const generateUniqueId = (length: number = 16): string => {
    let randomStr = '';
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * ALPHA.length);
        randomStr += ALPHA.substring(randomNumber, randomNumber + 1);
    }
    return randomStr;
};