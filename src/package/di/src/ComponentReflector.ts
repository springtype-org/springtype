import {BeanConfig, IComponent} from "./decorator/Component";
import {
    createDefaultArgumentsInjectionMetadata,
    INJECT_DECORATOR_METADATA_KEY, InjectionReference,
    ArgumentsInjectionMetaData
} from "./decorator/Inject";
import {InjectionStrategy} from "./BeanFactory";

export const COMPONENT_SYMBOL = Symbol('COMPONENT_SYMBOL');
export const COMPONENT_CONSTRUCTOR_PARAMETER_METADATA = Symbol('COMPONENT_CONSTRUCTOR_PARAMETER_METADATA');
export const COMPONENT_NAME = Symbol('COMPONENT_NAME');
export const COMPONENT_CONFIG = Symbol('COMPONENT_CONFIG');
export const RESOLVED_CONSTRUCTOR_ARGUMENTS = Symbol('RESOLVED_CONSTRUCTOR_ARGUMENTS');
export const COMPONENT_IS_MOCK_FLAG = Symbol('COMPONENT_IS_MOCK_FLAG');

/**
 * This class uses the Reflect.metadata standard API (polyfilled)
 * to fetch and store compile-time and runtime reflected metadata.
 *
 * Calls to Reflect.getMetadata() point to TypeScript compiler generated
 * metadata. All other Reflect.* calls deal with runtime metadata (from decorators, BeanFactory).
 */
export class ComponentReflector {

    static setIsMockComponent(componentCtor: IComponent<any>): void {
        Reflect.set(componentCtor, COMPONENT_IS_MOCK_FLAG, true);
    }

    static getIsMockComponent(componentCtor: IComponent<any>): boolean {
        return !!Reflect.get(componentCtor, COMPONENT_IS_MOCK_FLAG);
    }

    static getMethodArgumentTypes(componentCtor: IComponent<any>, propertyName: string) {
        return Reflect.getMetadata('design:paramtypes', componentCtor, propertyName) || [];
    }

    static getConstructorArgumentTypes(componentCtor: IComponent<any>): Array<IComponent<any>> {
        return Reflect.getMetadata('design:paramtypes', componentCtor) || [];
    }

    static register(
        componentCtor: IComponent<any>,
        parameterInjectionMetadata: ArgumentsInjectionMetaData,
        beanConfig?: BeanConfig<IComponent<any>>,
    ): void {

        Reflect.set(componentCtor, COMPONENT_CONFIG, beanConfig);
        Reflect.set(componentCtor, COMPONENT_SYMBOL, Symbol(componentCtor.name));
        Reflect.set(componentCtor, COMPONENT_NAME, componentCtor.name);
        Reflect.set(componentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA, parameterInjectionMetadata);
    }

    static registerDerived(
        originalComponentCtor: IComponent<any>,
        derivedComponentCtor: IComponent<any>,
    ) {

        Reflect.set(derivedComponentCtor, COMPONENT_SYMBOL, ComponentReflector.getSymbol(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_NAME, ComponentReflector.getName(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_CONFIG, ComponentReflector.getConfig(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA,
            ComponentReflector.getConstructorArgumentsInjectionMetadata(originalComponentCtor));
    }

    static getConstructorArgumentsInjectionMetadata(
        componentCtor: IComponent<any>
    ): ArgumentsInjectionMetaData {
        return Reflect.get(componentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA);
    }

    static setConstructorArgumentsInjectionMetadata(
        targetClassInstanceOrCtor: Function,
        parameterIndex: number,
        injectionReference: InjectionReference,
        injectionStrategy: InjectionStrategy): void {


        // fetch (probably existing) meta data
        const parameterInjectionMetaData: ArgumentsInjectionMetaData = Reflect.getOwnMetadata(
            INJECT_DECORATOR_METADATA_KEY, targetClassInstanceOrCtor, targetClassInstanceOrCtor.name
        ) || createDefaultArgumentsInjectionMetadata();

        // enhance meta data for parameter
        parameterInjectionMetaData.arguments[parameterIndex] = {
            index: parameterIndex,
            injectionReference,
            injectionStrategy
        };

        // (re-)define injection reference meta data
        Reflect.defineMetadata(
            INJECT_DECORATOR_METADATA_KEY,
            parameterInjectionMetaData,
            targetClassInstanceOrCtor,
            targetClassInstanceOrCtor.name);
    }

    static setMethodArgumentsInjectionMetadata(
        targetClassInstanceOrCtor: Object,
        parameterIndex: number,
        propertyKey: string | symbol,
        injectionReference: InjectionReference,
        injectionStrategy: InjectionStrategy
    ): void {

        // fetch (probably existing) meta data
        const parameterInjectionMetaData: ArgumentsInjectionMetaData = ComponentReflector.getMethodArgumentsInjectionMetadata(
            targetClassInstanceOrCtor, propertyKey
        ) || createDefaultArgumentsInjectionMetadata();

        // enhance meta data for parameter
        parameterInjectionMetaData.arguments[parameterIndex] = {
            index: parameterIndex,
            injectionReference,
            injectionStrategy
        };

        // (re-define) injection reference for parameter index
        Reflect.defineMetadata(INJECT_DECORATOR_METADATA_KEY, parameterInjectionMetaData, targetClassInstanceOrCtor, propertyKey);
    }

    static getMethodArgumentsInjectionMetadata(
        targetClassInstanceOrCtor: Object,
        propertyKey: string | symbol,
    ): ArgumentsInjectionMetaData {
        return Reflect.getOwnMetadata(
            INJECT_DECORATOR_METADATA_KEY, targetClassInstanceOrCtor, propertyKey
        );
    }

    static getSymbol(targetCtor: IComponent<any>): symbol {
        return Reflect.get(targetCtor, COMPONENT_SYMBOL);
    }

    static getName(targetCtor: IComponent<any>): string {
        return Reflect.get(targetCtor, COMPONENT_NAME);
    }

    static getConfig(targetCtor: IComponent<any>): BeanConfig<IComponent<any>> {
        return Reflect.get(targetCtor, COMPONENT_CONFIG);
    }

    /* When constructor arguments (injections) are resolved, the result is cached for later use */
    static setResolvedConstructorArguments(targetCtor: IComponent<any>, constructorArguments: Array<IComponent<any>>): void {
        Reflect.set(targetCtor, RESOLVED_CONSTRUCTOR_ARGUMENTS, constructorArguments);
    }

    static getResolvedConstructorArguments(targetCtor: IComponent<any>): Array<IComponent<any>> {
        return Reflect.get(targetCtor, RESOLVED_CONSTRUCTOR_ARGUMENTS);
    }

    static isComponent(componentCtor: IComponent<any>): boolean {
        return !!ComponentReflector.getSymbol(componentCtor);
    }
}