import {ValidationResult} from "./Validate";

function buildErrorText(error: ValidationResult): string {
    return `Parameter (name=${error.argumentName},index=${error.index}) is invalid (value=${error.input})`;
}

class PrintValidator implements Validator {
    public constructor() {
    }

    validate(errors: ValidationResult[]): void {
        console.error(errors.map(buildErrorText).join(' '))
    }
}

class AssertValidator implements Validator {
    public constructor() {
    }

    validate(errors: ValidationResult[]): void {
        throw new Error(errors.map(buildErrorText).join(' '))
    }
}

export const ASSERT_VALIDATOR: Validator = new AssertValidator();
export const PRINT_VALIDATOR: Validator = new PrintValidator();

export interface Validator {
    validate(result: ValidationResult[]): void;
}
