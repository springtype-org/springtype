import "reflect-metadata"
import {getParamNames, Optional, Try, Tuple2} from "../../util";
import {ErrorValidator, Validator} from "./Validator";

const VALIDATION_METHOD_PARAMNAMES_METADATA = Symbol("ParamNames");
const VALIDATION_DECORATOR_METADATA_KEY = Symbol("Validation");


export function Validate(validator: Validator = ErrorValidator.getInstance()) {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
        let method = descriptor.value;

        const reflectedParamNames = getParamNames(target[propertyName]);

        Object.defineProperties(target[propertyName].prototype, {
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
    }
}


export function Validation(validator: Validator = ErrorValidator.getInstance()) {
    return function classDecorator<T extends { new(...args: any[]): {} }>(target: T) {
        for (const propertyName of Object.keys(target.prototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
            if (descriptor && descriptor.value instanceof Function) {
                // decorate with validate
                Validate(validator).apply(null, [target.prototype, propertyName, descriptor]);
                Object.defineProperty(target.prototype, propertyName, descriptor);
            }
        }
        return target
    }
}

export function baseValidator(constrain: IValidate): ParameterDecorator {
    return function decorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const validationObject: Tuple2<number, IValidate>[] = Reflect.getOwnMetadata(VALIDATION_DECORATOR_METADATA_KEY, target, propertyKey) || [];
        Reflect.defineMetadata(VALIDATION_DECORATOR_METADATA_KEY, validationObject.concat(Tuple2.of(parameterIndex, constrain)), target, propertyKey);
    }
}

export type IValidate = (value: any) => boolean;

export type ValidationResult = {
    argumentName: String
    index: number
    input: any
}