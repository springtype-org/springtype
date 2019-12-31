import { ValidationResult } from "../interface/ivalidation-result";

export const getValidationErrorMessage = (error: ValidationResult): string => {
  return `@${error.validatorName} in class ${error.className}:${error.methodName}(...): Method parameter (name=${error.argumentName}, index=${error.index}) is invalid (value=${error.input})`;
}
