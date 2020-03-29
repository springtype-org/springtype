
export interface IValidationSate {
    valid: boolean| 'none';
    errors: Array<string>;
    value: string;
}