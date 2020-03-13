import {getParameterValidateDecorator} from "../function/get-parameter-validate-decorator";
import {validatorNameFactory} from "../function/validator-name-factory";

const VALIDATOR_NAME = 'credit-card';

// decorator @CreditCard
export const CreditCard = () => getParameterValidateDecorator(creditCard, VALIDATOR_NAME);

export const creditCard = validatorNameFactory((value: string): boolean => {
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
}, VALIDATOR_NAME);


export const toDigitList = (digitString: string): Array<number> => digitString.split('').map(Number);

const sum = (list: Array<number>): number => {
    let result = 0;
    list.forEach((d) => result += d);
    return result;
};