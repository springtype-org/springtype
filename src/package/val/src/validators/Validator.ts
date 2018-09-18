import {ValidationResult} from "../Validate";
import {BeanFactory} from "../../../di";
import {PrintValidator} from "./ErrorValidator";

const DEFAULT: Validator = BeanFactory.getBean(PrintValidator);

export class ValidationConfigurator {
    static active: Validator = DEFAULT;

    static registerBehavoir(validator: Validator) {
        this.active = validator;
    }
}

export interface Validator {
    validate(result: ValidationResult[]): void;
}
