export const CHARSET_ALPHA_UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const CHARSET_ALPHA_LOWER_CASE = CHARSET_ALPHA_UPPER_CASE.toLowerCase();
export const CHARSET_NUMERIC = '0123456789';
export const CHARSET_ALPHA_NUMERIC = CHARSET_ALPHA_LOWER_CASE + CHARSET_ALPHA_UPPER_CASE + CHARSET_NUMERIC;

/**
 * This class generates random numbers or strings to a given characterSet.
 */
export class Randomizer {


    private constructor() {
    }

    /**
     * Generate one random string
     * @param characterSet the characters that will be included
     * @param length the length of string
     */
    static generateString(characterSet: string, length: number): string {
        let str = "";
        for (let i = 0; i < length; i++) {
            str += characterSet[~~(Math.random() * characterSet.length)];
        }
        return str;
    }

    /**
     * Generate an array of random strings
     * @param characterSet the characters that will be included
     * @param length the length of string
     * @param amount the size of generated strings
     */
    static generateStrings(characterSet: string, length: number, amount: number): string[] {
        let result = new Array<string>(amount);
        for (let i = 0; i < length; i++) {
            result[i] = Randomizer.generateString(characterSet, length);
        }
        return result;
    }

    /**
     * Generate a array of random numbers
     * @param min the minimum value
     * @param max the maximum value
     * @param amount amount the size of generated numbers
     */
    static generateNumbers(min: number, max: number, amount: number): number[] {
        let result = new Array<number>(amount);
        for (let i = 0; i < amount; i++) {
            result[i] = (Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return result;
    }
}
