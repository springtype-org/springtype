import {ValidationResult} from "./Validate";
import {Component} from "../../di";

function buildErrorText(error: ValidationResult): string {
    return `Parameter (name=${error.argumentName},index=${error.index}) is invalid (value=${error.input})`;
}
@Component()
export class PrintValidator implements Validator {
    validate(errors: ValidationResult[]): void {
        console.error(errors.map(buildErrorText).join(' '))
    }
}

@Component()
export class ErrorValidator implements Validator {
    validate(errors: ValidationResult[]): void {
        throw new Error(errors.map(buildErrorText).join(' '))
    }
}

const DEFAULT: Validator = new ErrorValidator();

export class ValidationConfigurator {
    static active: Validator = DEFAULT;
}


export interface Validator {
    validate(result: ValidationResult[]): void;
}
