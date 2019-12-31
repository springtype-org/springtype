import { IValidator } from "../interface/ivalidator";
import { ValidationResult } from "../interface/ivalidation-result";
import { getValidationErrorMessage } from "../function/get-validation-error-message";
import { st } from "../..";

export class AssertValidator implements IValidator {

  validate(errors: Array<ValidationResult>): void {



      st.error(errors.map(getValidationErrorMessage).join(' '))
  }
}
