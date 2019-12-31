import { IValidator } from "./interface/ivalidator";
import { AssertValidator } from "./validator/assert";
import { PrintValidator } from "./validator/print";
import { ValidationOptions } from "./interface/validation-options";

export { registerValidation as validate } from "./function/register-validation";
export { validation } from "./decorator/validation";

export * from "./validate/index";

export const ASSERT_VALIDATOR: IValidator = new AssertValidator();
export const VALIDATOR_DEFAULT = ASSERT_VALIDATOR;
export const PRINT_VALIDATOR: IValidator = new PrintValidator();
export const VALIDATOR_OPTIONS_DEFAULT: ValidationOptions = { required: true };

export const VALIDATION_METHOD_PARAMNAMES_METADATA = "ParamNames";
export const VALIDATION_DECORATOR_METADATA_KEY = "Validation";
