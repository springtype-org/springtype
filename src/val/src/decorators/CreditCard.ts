import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options, validateRequired} from "../ValidateMethod";
import {validate as fromIsString} from "./IsString"
import {List} from "../../../lang";


export const CreditCard = (options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => fromIsString(value) && validate(<string> value),
            options)
    );


export const validate = (value: string): boolean => {
    //delete all not numeric stuff
    const ccDigits: string = String(value).toUpperCase().replace(/[^0-9]/g, '');
    const total = sum(toDigitList(ccDigits)
    // reverse
        .reverse()
        // double every odd index
        .map((v, i) => i % 2 === 1 ? (v + v) : (v))
        // to add the digits in a number
        .map((v) => sum(toDigitList(String(v)))));
    return total % 10 === 0
};

export const toDigitList = (digitString: string): List<number> => List.of(digitString.split(''))
    .map(Number);

const sum = (list: List<number>): number => {
    let result = 0;
    list.forEach((d) => result += d);
    return result;
};