export function isNumericString(value) {
    return /^-{0,1}\d+$/.test(value);
}