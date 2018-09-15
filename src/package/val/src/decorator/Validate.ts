import "reflect-metadata"

const VALIDATION_DECORATOR_METADATA_KEY = Symbol("Validation");

export function Validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    let method = descriptor.value;
    descriptor.value = function () {
        const validationObject: {[key: number]: ValidationConstrain[]} = Reflect.getMetadata(VALIDATION_DECORATOR_METADATA_KEY, target, propertyName) || {};

        for(const parameterIndex in Object.keys(validationObject)){
           const constrains: ValidationConstrain[]  = validationObject[parameterIndex] || [];
           for(const constrain of constrains){
               constrain.validate("df", arguments[parameterIndex]);
           }
        }
        return method.apply(this, arguments);
    }
}

export function baseValidator(target: Object, propertyKey: string | symbol, parameterIndex: number, constrain: ValidationConstrain) {
    const validationObject: {[key: number]: ValidationConstrain[]} = Reflect.getOwnMetadata(VALIDATION_DECORATOR_METADATA_KEY, target, propertyKey) || {};
    const constrains: ValidationConstrain[] = validationObject[parameterIndex] || [];
    constrains.push(constrain);
    validationObject[parameterIndex] = constrains;
    Reflect.defineMetadata(VALIDATION_DECORATOR_METADATA_KEY, validationObject, target, propertyKey);
}
export interface ValidationConstrain {
    validate(paramName: string, value: Object): void;
}

