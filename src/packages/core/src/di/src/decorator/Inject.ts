import {ComponentReflector} from "../ComponentReflector";
import {InjectionStrategy} from "../enum/InjectionStrategy";
import {InjectionReference} from "../type/InjectionReference";

export interface InjectionOption {
    injectionReference?: InjectionReference;
    injectionStrategy: InjectionStrategy;
}

const DEFAULT_INJECTION_OPTION: InjectionOption = {
    injectionStrategy: InjectionStrategy.SINGLETON
};

export function Inject(injectionOptions: InjectionOption = DEFAULT_INJECTION_OPTION) {

    return function (targetClassInstanceOrCtor: Object | Function, propertyKey: string | symbol, argumentIndex: number) {

        if (typeof targetClassInstanceOrCtor === 'function') {
            // case: param on constructor function
            ComponentReflector.setConstructorArgumentsInjectionMetadata(
                targetClassInstanceOrCtor,
                argumentIndex,
                injectionOptions.injectionReference,
                injectionOptions.injectionStrategy
            );

        } else {

            // case: param on method
            ComponentReflector.setMethodArgumentsInjectionMetadata(
                targetClassInstanceOrCtor,
                argumentIndex,
                propertyKey,
                injectionOptions.injectionReference,
                injectionOptions.injectionStrategy
            );
        }
    }
}