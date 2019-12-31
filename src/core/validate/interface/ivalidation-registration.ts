import { ValidateFunction } from "./validate-function";

export interface IValidationRegistration {
  parameterIndex: number;
  validateFn: ValidateFunction;
  validatorName: string;
}
