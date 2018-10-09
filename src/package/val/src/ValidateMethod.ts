import "reflect-metadata"
import {getParamNames, Tuple2} from "../../lang";
import {IValidator, VALIDATOR_DEFAULT} from "./Validator";
import {validate} from "./decorators/Required";

const VALIDATION_METHOD_PARAMNAMES_METADATA = Symbol("ParamNames");
const VALIDATION_DECORATOR_METADATA_KEY = Symbol("Validation");


export const Validate = (validator: IValidator = VALIDATOR_DEFAULT) =>
    (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
        let method = descriptor.value;

        const reflectedParamNames = getParamNames(target[propertyName]);

        Reflect.set(target[propertyName], VALIDATION_METHOD_PARAMNAMES_METADATA,{
            [VALIDATION_METHOD_PARAMNAMES_METADATA]: reflectedParamNames
        });

        descriptor.value = function () {
            const validationObject: Tuple2<number, IValidate>[] = Reflect.getMetadata(VALIDATION_DECORATOR_METADATA_KEY, target, propertyName) || {};
            const errors: ValidationResult[] = [];
            for (const validationTuple2 of validationObject) {
                const parameterIndex = validationTuple2._1;
                const input = arguments[parameterIndex];

                if (!validationTuple2._2(input)) {
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


export const baseValidator = (constrain: IValidate): ParameterDecorator =>
    (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const validationObject: Tuple2<number, IValidate>[] = Reflect.getOwnMetadata(VALIDATION_DECORATOR_METADATA_KEY, target, propertyKey) || [];
        Reflect.defineMetadata(VALIDATION_DECORATOR_METADATA_KEY, validationObject.concat(Tuple2.of(parameterIndex, constrain)), target, propertyKey);
    };

export type IValidate = (value: any) => boolean;

export type Options = { required?: boolean; }
export const DECORATOR_OPTIONS_DEFAULT: Options = {required: true};

export type ValidationResult = {
    argumentName: String
    index: number
    input: any
}

export const validateRequired = (value: any, func: () => boolean, options: Options,): boolean => {
    const isValid = validate(value);
    if (!!!options.required) {
        //required === false
        if (isValid) {
            return func();
        }
        return true;
    } else {
        //required === true
        return isValid && func();
    }
};
