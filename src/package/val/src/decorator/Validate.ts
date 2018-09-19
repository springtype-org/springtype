import "reflect-metadata"

const VALIDATION_METHOD_PARAMNAMES_METADATA  = Symbol("ParamNames");
const VALIDATION_DECORATOR_METADATA_KEY = Symbol("Validation");

export function getParamNames(fn: Function) {

    let src = fn.toString().replace(/\/\*.*\*\//, '');
    let params = [];
    let pos1 = src.indexOf('(');
    let pos2 = src.indexOf(')');
    let paramSrc = src.substring(pos1+1, pos2);

    if (pos1 === -1) {

        params = [src.split('=>')[0].trim()];

    } else {

        let params_ = paramSrc.split(',');

        for (let i=0; i<params_.length; ++i) {

            let paramName = params_[i].trim();

            if (paramName) {
                params.push(paramName);
            }
        }
    }
    return params;
}


export function Validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    let method = descriptor.value;

    const reflectedParamNames = getParamNames(target[propertyName]);

    // ???
    Object.defineProperties(target[propertyName].prototype,{
        [VALIDATION_METHOD_PARAMNAMES_METADATA]: reflectedParamNames
    });

    descriptor.value = function () {
        const validationObject: {[key: number]: ValidationConstrain[]} = Reflect.getMetadata(VALIDATION_DECORATOR_METADATA_KEY, target, propertyName) || {};

        for(const parameterIndex in Object.keys(validationObject)){
           const constrains: ValidationConstrain[]  = validationObject[parameterIndex] || [];
           for(const constrain of constrains){
               constrain.validate(reflectedParamNames[parameterIndex], arguments[parameterIndex]);
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
