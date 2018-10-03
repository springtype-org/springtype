import {baseValidator, DECORATOR_OPTIONS_DEFAULT, Options, validateRequired} from "../ValidateMethod";
import {validate as fromIsString} from "./IsString"

export const IBAN = (options: Options = DECORATOR_OPTIONS_DEFAULT) =>
    baseValidator((value) =>
        validateRequired(
            value,
            () => fromIsString(value) && validate(<string> value),
            options)
    );


export const validate = (value: string): boolean => {
    const CODE_LENGTHS: { [key: string]: number } = {
        AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
        CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
        FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
        HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
        LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
        MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
        RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
    };
    // keep only alphanumeric characters
    const iban: string = String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
    // match and capture (1) the country code, (2) the check digits, and (3) the rest
    const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
    // check syntax and length
    if (null === code || iban.length !== CODE_LENGTHS[code[1]]) {
        return false;
    }
    // rearrange country code and check digits, and convert chars to ints
    const digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, (letter) => String(letter.charCodeAt(0) - 55));
    // final check
    return mod97(digits)
};


const mod97 = (string: string): boolean => {
    let checksum = parseInt(string.slice(0, 2), 10);
    let fragment;
    for (let offset = 2; offset < string.length; offset += 7) {
        fragment = String(checksum) + string.substring(offset, offset + 7);
        checksum = parseInt(fragment, 10) % 97;
    }
    return checksum === 1;
};
