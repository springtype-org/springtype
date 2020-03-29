const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

export const getUniqueHTMLId = (): string => {
    const string_length = 16;
    let randomStr = '';
    for (let i = 0; i < string_length; i++) {
        const randomNumber = Math.floor(Math.random() * ALPHA.length);
        randomStr += ALPHA.substring(randomNumber, randomNumber + 1);
    }
    return randomStr;
};