import "reflect-metadata"
import {getParamNames, Tuple2} from "../../util";
import {ValidationConfigurator} from "./Validator";

const VALIDATION_METHOD_PARAMNAMES_METADATA = Symbol("ParamNames");
const VALIDATION_DECORATOR_METADATA_KEY = Symbol("Validation");



export function Validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    let method = descriptor.value;

    const reflectedParamNames = getParamNames(target[propertyName]);

    Object.defineProperties(target[propertyName].prototype, {
        [VALIDATION_METHOD_PARAMNAMES_METADATA]: reflectedParamNames
    });

    descriptor.value = function() {
        const validationObject: Tuple2<number, IValidate>[] = Reflect.getMetadata(VALIDATION_DECORATOR_METADATA_KEY, target, propertyName) || {};
        const errors: ValidationResult[] = [];
        for (const validationTuple2 of validationObject) {
            const parameterIndex = validationTuple2._1;
            const input = arguments[parameterIndex];

            if (!validationTuple2._2(input)) {
                errors.push({
                    argumentName: reflectedParamNames[parameterIndex],
                    index: parameterIndex,
                    input: arguments[parameterIndex],
                })
            }

        }
        if (errors.length > 0) {
            ValidationConfigurator.active.validate(errors);
        } else {
            return method.apply(this, arguments);
        }
    }
}

export function baseValidator(constrain: IValidate): ParameterDecorator {
    return function decorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const validationObject: Tuple2<number, IValidate>[] = Reflect.getOwnMetadata(VALIDATION_DECORATOR_METADATA_KEY, target, propertyKey) || [];
        Reflect.defineMetadata(VALIDATION_DECORATOR_METADATA_KEY, validationObject.concat(Tuple2.of(parameterIndex, constrain)), target, propertyKey);
    }
}

export type IValidate= (value: any) => boolean;

export type ValidationResult = {
    argumentName: String
    index: number
    input: any
}