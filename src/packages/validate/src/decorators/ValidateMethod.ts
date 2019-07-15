import {IValidator, VALIDATOR_DEFAULT} from "./Validator";
import {validate} from "./validators/Required";
import {getParamNames} from "../method/getParamNames";

const VALIDATION_METHOD_PARAMNAMES_METADATA = Symbol("ParamNames");
const VALIDATION_DECORATOR_METADATA_KEY = Symbol("Validation")


export interface IValidationRegistration {
    parameterIndex: number;
    validateFn: IValidateFn;
}
export const Validate = (validator: IValidator = VALIDATOR_DEFAULT) =>
    (prototype: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) => {

        let method = descriptor.value;

        const reflectedParamNames = getParamNames(prototype[methodName]);

        Reflect.set(prototype[methodName], VALIDATION_METHOD_PARAMNAMES_METADATA,{
            [VALIDATION_METHOD_PARAMNAMES_METADATA]: reflectedParamNames
        });

        descriptor.value = function() {

            const validationRegistrations: Array<IValidationRegistration> = Reflect.getMetadata(VALIDATION_DECORATOR_METADATA_KEY, prototype, methodName) || {};
            const errors: ValidationResult[] = [];

            for (const validationRegistration of validationRegistrations) {

                const parameterIndex = validationRegistration.parameterIndex;
                const input = arguments[parameterIndex];

                if (!validationRegistration.validateFn(input)) {

                    errors.push({
                        argumentName: reflectedParamNames[parameterIndex],
                        index: parameterIndex,
                        input: arguments[parameterIndex]
                    })
                }
            }
            if (errors.length > 0) {
                validator.validate(errors);
            } else {
                return method.apply(this, arguments);
            }
        }
    };


export const baseValidator = (validateFn: IValidateFn): ParameterDecorator => {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {

        const validationRegistrations: Array<IValidationRegistration> = Reflect.getOwnMetadata(
            VALIDATION_DECORATOR_METADATA_KEY, target, propertyKey) || [];

        Reflect.defineMetadata(VALIDATION_DECORATOR_METADATA_KEY, validationRegistrations.concat({
            parameterIndex,
            validateFn
        }), target, propertyKey);
    };
};

export type IValidateFn = (value: any) => boolean;

export type Options = { required?: boolean; }
export const DECORATOR_OPTIONS_DEFAULT: Options = {required: true};

export type ValidationResult = {
    argumentName: String
    index: number
    input: any
}

export const validateRequired = (value: any, fn: () => boolean, options: Options,): boolean => {
    const isValid = validate(value);

    if (!options.required) {
        //required === false
        if (isValid) {
            return fn();
        }
        return true;

    } else {
        //required === true
        return isValid && fn();
    }
};
