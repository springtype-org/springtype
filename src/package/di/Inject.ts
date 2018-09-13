import "reflect-metadata";
import {BeanFactory, InjectionProfile, InjectionStrategy} from "./BeanFactory";

export const INJECT_DECORATOR_METADATA_KEY = Symbol("Inject");

export interface InjectBeanFactory {
    factory(): any;
}

export interface ParameterInjectionMetaDataEntry {
    parameterIndex: number;
    injectionReference: InjectionReference;
    injectionProfile: InjectionProfile;
}

export interface ParameterInjectionMetaData {
    parameters: Array<ParameterInjectionMetaDataEntry>;
}

export function createDefaultParameterInjectionMetaData() {
    return {
        parameters: []
    }
}

/**
 * any value except a value typeof InjectBeanFactory or Function:
 * -> just injects the value named
 *
 * value typeof InjectBeanFactory
 * -> uses a singleton instance of that InjectBeanFactory to produce an instance to inject
 *
 * value typeof Function
 * -> uses the Function as a constructor and creates an instance of it to inject
 */
export declare type InjectionReference =  any | InjectBeanFactory | Function;

export function resolveInjectionParameterValue(parameterInjectionMetaData: ParameterInjectionMetaData, parameterIndex: number) {

    let injectionValue: any;

    if (!parameterInjectionMetaData.parameters[parameterIndex]) return;

    const injectionReference: InjectionReference = parameterInjectionMetaData.parameters[parameterIndex].injectionReference;

    if (typeof injectionReference !== 'undefined') {

        if (typeof injectionReference === 'function') {

            // dynamic InjectBeanFactory signature check
            if (injectionReference.prototype.factory &&
                typeof injectionReference.prototype.factory === 'function') {

                // TODO: Optimize -> use BeanFactory and cache factory instances itself
                const factoryOrInstance = new injectionReference();

                injectionValue = factoryOrInstance.factory();

            } else if (injectionReference.prototype.metaClassName) {

                // it is not a InjectBeanFactory, just use the instance
                injectionValue = BeanFactory.getBean(
                    injectionReference,
                    parameterInjectionMetaData.parameters[parameterIndex].injectionProfile,
                    InjectionStrategy.NEW_INSTANCE
                );

            } else {

                // case: function is not a InjectBeanFactory NOR registered bean -> inject function reference
                injectionValue = injectionReference;
            }

        } else {

            // use the value directly (any value case)
            injectionValue = injectionReference;
        }
    } else {



    }
    return injectionValue;
}

export function BeanMethod(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function | any>) {

    const reflectedParamTypes = Reflect.getMetadata('design:paramtypes', target, propertyName) || [];

    // backup original method
    const method: Function = <Function> descriptor.value;

    descriptor.value = function() {

        // replacement method impl. -> this is called when the actual @BeanMethod annotated method is called (hook)

        const parameterInjectionMetaData: ParameterInjectionMetaData = Reflect.getOwnMetadata(
            INJECT_DECORATOR_METADATA_KEY, target, propertyName
        );

        const newArgs = [];

        // first, copy initial arguments
        for (let i=0; i<arguments.length; i++) {
            newArgs[i] = arguments[i];
        }

        if (parameterInjectionMetaData &&
            parameterInjectionMetaData.parameters &&
            parameterInjectionMetaData.parameters.length) {

            // copy arguments over into new arguments array (because arguments are immutable in modern times ;)
            for (let i=0; i<parameterInjectionMetaData.parameters.length; i++) {


                // resolve override injection argument
                const injectionValue = resolveInjectionParameterValue(parameterInjectionMetaData, i);

                // conditionally overwrite original call argument for sub-call
                if (typeof injectionValue !== 'undefined') {

                    newArgs[i] = injectionValue;

                } else if (parameterInjectionMetaData.parameters[i]) {

                    // parameter has @Inject decorator, but no explicit value; fallback to singleton strategy!
                    if (reflectedParamTypes[i]) {

                        // fetch singleton from cache by reflected type
                        newArgs[i] = BeanFactory.getBean(reflectedParamTypes[i]);
                    }
                }
            }
        }
        return method.apply(this, newArgs);
    }
}

export function Inject(
    injectionReference?: InjectionReference,
    injectionProfile: InjectionProfile = InjectionProfile.DEFAULT
) {

    return function(targetClassInstanceOrCtor: Object|Function, propertyKey: string | symbol, parameterIndex: number) {

        // case: param on constructor function
        if (typeof targetClassInstanceOrCtor === 'function') {

            // fetch (probably existing) meta data
            const parameterInjectionMetaData: ParameterInjectionMetaData = Reflect.getOwnMetadata(
                INJECT_DECORATOR_METADATA_KEY, targetClassInstanceOrCtor, targetClassInstanceOrCtor.name
            ) || createDefaultParameterInjectionMetaData();

            // enhance meta data for parameter
            parameterInjectionMetaData.parameters[parameterIndex] = {
                parameterIndex,
                injectionReference,
                injectionProfile
            };

            // (re-)define injection reference meta data
            Reflect.defineMetadata(
                INJECT_DECORATOR_METADATA_KEY,
                parameterInjectionMetaData,
                targetClassInstanceOrCtor,
                targetClassInstanceOrCtor.name);

        } else {

            // case: param on method

            // fetch (probably existing) meta data
            const parameterInjectionMetaData: ParameterInjectionMetaData = Reflect.getOwnMetadata(
                INJECT_DECORATOR_METADATA_KEY, targetClassInstanceOrCtor, propertyKey
            ) || createDefaultParameterInjectionMetaData();

            // enhance meta data for parameter
            parameterInjectionMetaData.parameters[parameterIndex] = {
                parameterIndex,
                injectionReference,
                injectionProfile
            };

            // (re-define) injection reference for parameter index
            Reflect.defineMetadata(INJECT_DECORATOR_METADATA_KEY, parameterInjectionMetaData, targetClassInstanceOrCtor, propertyKey);
        }
    }
}