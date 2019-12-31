import { IValidator } from "../interface/ivalidator";

import { ValidationResult } from "../interface/ivalidation-result";

import { getValidationErrorMessage } from "../function/get-validation-error-message";

export class PrintValidator implements IValidator {

  validate(errors: Array<ValidationResult>): void {
      console.error(errors.map(getValidationErrorMessage).join(' '))
  }
}
