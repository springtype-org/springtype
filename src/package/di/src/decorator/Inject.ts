import "reflect-metadata";
import {InjectionProfile, InjectionStrategy} from "../BeanFactory";
import {ComponentReflector} from "../ComponentReflector";
import {ApplicationContext} from "../ApplicationContext";

export const INJECT_DECORATOR_METADATA_KEY = Symbol("@Inject");

export interface ArgumentInjectionMetadata {
    index: number;
    injectionReference: InjectionReference;
    injectionStrategy: InjectionStrategy;
}

export interface ArgumentsInjectionMetaData {
    arguments: Array<ArgumentInjectionMetadata>;
}

export function createDefaultArgumentsInjectionMetadata() {
    return {
        arguments: []
    }
}

export declare type InjectionReference = any | Function;

export function resolveInjectionParameterValue(
    argumentsInjectionMetaData: ArgumentsInjectionMetaData,
    index: number,
    isTestComponent: boolean
) {

    let injectionValue: any;

    if (!argumentsInjectionMetaData.arguments[index]) return;

    const injectionReference: InjectionReference =
        argumentsInjectionMetaData.arguments[index].injectionReference;

    if (typeof injectionReference !== 'undefined') {

        if (typeof injectionReference === 'function') {

            if (ComponentReflector.isComponent(injectionReference)) {

                // it is not a InjectBeanFactory, just use the instance
                injectionValue = ApplicationContext.getInstance().getBean(
                    injectionReference,
                    isTestComponent ? InjectionProfile.TEST : InjectionProfile.DEFAULT,
                    argumentsInjectionMetaData.arguments[index].injectionStrategy,
                );

            } else {

                // case: function is not a InjectBeanFactory NOR registered bean -> inject function reference
                injectionValue = injectionReference;
            }

        } else {

            // use the value directly (any value case)
            injectionValue = injectionReference;
        }
    }
    return injectionValue;
}

export function Inject(
    injectionReference?: InjectionReference,
    injectionStrategy: InjectionStrategy = InjectionStrategy.SINGLETON
) {

    return function(targetClassInstanceOrCtor: Object|Function, propertyKey: string | symbol, argumentIndex: number) {

        if (typeof targetClassInstanceOrCtor === 'function') {

            // case: param on constructor function
            ComponentReflector.setConstructorArgumentsInjectionMetadata(
                targetClassInstanceOrCtor,
                argumentIndex,
                injectionReference,
                injectionStrategy
            );

        } else {

            // case: param on method
            ComponentReflector.setMethodArgumentsInjectionMetadata(
                targetClassInstanceOrCtor,
                argumentIndex,
                propertyKey,
                injectionReference,
                injectionStrategy
            );
        }
    }
}