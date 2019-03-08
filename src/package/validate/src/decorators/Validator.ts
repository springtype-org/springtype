import {ValidationResult} from "./ValidateMethod";

function buildErrorText(error: ValidationResult): string {
    return `Parameter (name=${error.argumentName},index=${error.index}) is invalid (value=${error.input})`;
}

class PrintValidator implements IValidator {
    public constructor() {
    }

    validate(errors: ValidationResult[]): void {
        console.error(errors.map(buildErrorText).join(' '))
    }
}

class AssertValidator implements IValidator {
    public constructor() {
    }

    validate(errors: ValidationResult[]): void {

        console.log('AssertValidator', errors);

        throw new Error(errors.map(buildErrorText).join(' '))
    }
}

export const ASSERT_VALIDATOR: IValidator = new AssertValidator();
export const VALIDATOR_DEFAULT = ASSERT_VALIDATOR;
export const PRINT_VALIDATOR: IValidator = new PrintValidator();

export interface IValidator {
    validate(result: ValidationResult[]): void;
}
