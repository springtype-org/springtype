import {ComponentReflector} from "../ComponentReflector";
import {InjectionStrategy} from "../enum/InjectionStrategy";
import {InjectionReference} from "../type/InjectionReference";

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