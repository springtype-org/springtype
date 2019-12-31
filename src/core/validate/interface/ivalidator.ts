import { ValidationResult } from "./ivalidation-result";

export interface IValidator {
  validate(result: Array<ValidationResult>, instance: any): void;
}
