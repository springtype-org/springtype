import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options, validateRequired} from "../ValidateMethod";
import {validate as fromIsString} from "./IsString"
import {toDigitList} from "./CreditCard";


/*
* @author: Tomasz Sochacki
* see https://github.com/drogimex/isbn-validate
*/
export const ISBN = (options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => fromIsString(value) && validate(<string> value),
            options)
    );

/**
 * validateFn function
 * @param value the raw isbn number
 */
export const validate = (value: string): boolean => {
    const isbn = value.replace(PREFIX_ISBN_REGEX, '');
    return ISBN_REGEX.test(isbn) && checksum(isbn);
};

/*
* Checksum for validateFn ISBN-10 and ISBN-13.
*/
const checksum = (value: string): boolean => {
    //isbn have to be number or string (composed only of digits or char "X"):
    const isbn = value;

    //Remove last digit (control digit):
    //Convert number to array (with only digits):
    let number = toDigitList(isbn.slice(0, -1));

    //Save last digit (control digit):
    const last = isbn.slice(-1);
    const lastDigit = (last !== 'X') ? parseInt(last, 10) : 'X';

    //Algorithm for checksum calculation (digit * position):
    number = number.map((digit, index) => {
        return digit * (index + 1);
    });

    //Calculate checksum from array:
    const sum = number.reduce((a, b) => a + b, 0);

    //Validate control digit:
    const controlDigit = sum % 11;
    return lastDigit === (controlDigit !== 10 ? controlDigit : 'X');
};


/*
 * Regexp for remove prefix in ISBN number.
 * Example prefixes which will be removed:
 * ISBN number
 * ISBN: number
 * ISBN-10 number
 * ISBN-13 number
 * ISBN-10: number
 * ISBN-13: number
 *
 * Regexp description:
 * /^ISBN       on start 'ISBN' or 'isbn'
 * (?:-1[03])?  optional prefix -10 or -13
 * :?           optional colon ":"
 * \x20+        minimum one space
 * /i           case insensitive
 */
const PREFIX_ISBN_REGEX = /^ISBN(?:-1[03])?:?\x20+/i;

/*
 * Regexp for validateFn ISBN (only nubers or char "X").
 * Example for ISBN-10: "048665088X", "0306406152".
 * Example for ISBN-13: "9788371815102".
 *
 * Regexp description:
 * /^          start of string
 * (?:
 *    \d{9}    9 digits
 *    [\dXx]   and of end one digit or char "X"/"x"
 *    |\d{13}  or 13 digits (ISBN-13)
 * )$/         and of string
 */
const ISBN_REGEX = /^(?:\d{9}[\dXx]|\d{13})$/;