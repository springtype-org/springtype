import {Component} from "../../../di";
import {ValidationResult} from "../Validate";
import {Validator} from "./Validator";

@Component()
export class PrintValidator implements Validator {
    validate(errors: ValidationResult[]): void {
        console.error(errors.map((error) => {
            return ` parameter (name=${error.argumentName},index=${error.index}) is invalid`
        }).join(' '))
    }

}