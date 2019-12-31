import { ValidationResult } from "./ivalidation-result";

export interface IValidationLifecycle {
  onValid(validationResult: ValidationResult): void;
  onInvalid(validationResult: ValidationResult): void;
}
