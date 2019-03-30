import {InjectionStrategy} from "./enum/InjectionStrategy";
import {ComponentImpl} from "./interface/ComponentImpl";
import {BeanConfig} from "./interface/BeanConfig";
import {INJECT_DECORATOR_METADATA_KEY} from "./constant/INJECT_DECORATOR_METADATA_KEY";
import {ArgumentsInjectionMetadata} from "./interface/ArgumentsInjectionMetadata";
import {createDefaultArgumentsInjectionMetadata} from "./function/createDefaultArgumentsInjectionMetadata";
import {InjectionReference} from "./type/InjectionReference";
import {BeanInitializer} from "./interface/BeanInitializer";
import {ConstructorArgumentInitializer} from "./interface/ConstructorArgumentInitializer";
import {ConstructorArgumentInitializerFunction} from "./interface/ConstructorArgumentInitializerFunction";

const COMPONENT = 'COMPONENT';
const COMPONENT_CONFIG = 'COMPONENT_CONFIG';
const COMPONENT_CONSTRUCTOR_PARAMETER_METADATA = 'COMPONENT_CONSTRUCTOR_PARAMETER_METADATA';
const COMPONENT_INITIALIZERS = 'COMPONENT_INITIALIZERS';
const COMPONENT_IS_MOCK_FLAG = 'COMPONENT_IS_MOCK_FLAG';
const COMPONENT_NAME = 'COMPONENT_NAME';
const CONSTRUCTOR_ARGUMENT_INITIALIZERS = 'CONSTRUCTOR_ARGUMENT_INITIALIZERS';
const RESOLVED_CONSTRUCTOR_ARGUMENTS = 'RESOLVED_CONSTRUCTOR_ARGUMENTS';

/**
 * This class uses the Reflect.metadata standard API (polyfilled)
 * to fetch and store compile-time and runtime reflected metadata.
 *
 * Calls to Reflect.getMetadata() point to TypeScript compiler generated
 * metadata. All other Reflect.* calls deal with runtime metadata (from decorators, BeanFactory).
 */
export class ComponentReflector {

    static setIsMockComponent(componentCtor: ComponentImpl<any>): void {
        Reflect.set(componentCtor, COMPONENT_IS_MOCK_FLAG, true);
    }

    static getIsMockComponent(componentCtor: ComponentImpl<any>): boolean {
        return !!Reflect.get(componentCtor, COMPONENT_IS_MOCK_FLAG);
    }

    static getMethodArgumentTypes(componentCtor: ComponentImpl<any>, propertyName: string) {
        return Reflect.getMetadata('design:paramtypes', componentCtor, propertyName) || [];
    }

    static getConstructorArgumentTypes(componentCtor: ComponentImpl<any>): Array<ComponentImpl<any>> {
        return Reflect.getMetadata('design:paramtypes', componentCtor) || [];
    }

    static register(
        componentCtor: ComponentImpl<any>,
        parameterInjectionMetadata: ArgumentsInjectionMetadata,
        beanConfig?: BeanConfig<ComponentImpl<any>>,
    ): void {

        Reflect.set(componentCtor, COMPONENT_CONFIG, beanConfig);
        Reflect.set(componentCtor, COMPONENT, Symbol(componentCtor.name));
        Reflect.set(componentCtor, COMPONENT_NAME, componentCtor.name);
        Reflect.set(componentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA, parameterInjectionMetadata);
    }

    static registerDerived(
        originalComponentCtor: ComponentImpl<any>,
        derivedComponentCtor: ComponentImpl<any>,
    ) {

        Reflect.set(derivedComponentCtor, COMPONENT, ComponentReflector.getSymbol(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_NAME, ComponentReflector.getName(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_CONFIG, ComponentReflector.getConfig(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA,
            ComponentReflector.getConstructorArgumentsInjectionMetadata(originalComponentCtor));
    }

    static getConstructorArgumentsInjectionMetadata(
        componentCtor: ComponentImpl<any>
    ): ArgumentsInjectionMetadata {
        return Reflect.get(componentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA);
    }

    static setConstructorArgumentsInjectionMetadata(
        targetClassInstanceOrCtor: Function,
        parameterIndex: number,
        injectionReference: InjectionReference,
        injectionStrategy: InjectionStrategy): void {


        // fetch (probably existing) meta data
        const parameterInjectionMetaData: ArgumentsInjectionMetadata = Reflect.getOwnMetadata(
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
        const parameterInjectionMetaData: ArgumentsInjectionMetadata = ComponentReflector.getMethodArgumentsInjectionMetadata(
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
    ): ArgumentsInjectionMetadata {
        return Reflect.getOwnMetadata(
            INJECT_DECORATOR_METADATA_KEY, targetClassInstanceOrCtor, propertyKey
        );
    }

    static getSymbol(targetCtor: ComponentImpl<any>): any {
        return Reflect.get(targetCtor, COMPONENT);
    }

    static getName(targetCtor: ComponentImpl<any>): string {
        return Reflect.get(targetCtor, COMPONENT_NAME);
    }

    static getConfig(targetCtor: ComponentImpl<any>): BeanConfig<ComponentImpl<any>> {
        return Reflect.get(targetCtor, COMPONENT_CONFIG);
    }

    /* When constructor arguments (injections) are resolved, the result is cached for later use */
    static setResolvedConstructorArguments(targetCtor: ComponentImpl<any>, constructorArguments: Array<ComponentImpl<any>>): void {
        Reflect.set(targetCtor, RESOLVED_CONSTRUCTOR_ARGUMENTS, constructorArguments);
    }

    static getResolvedConstructorArguments(targetCtor: ComponentImpl<any>): Array<ComponentImpl<any>> {
        return Reflect.get(targetCtor, RESOLVED_CONSTRUCTOR_ARGUMENTS);
    }

    static isComponent(componentCtor: ComponentImpl<any>): boolean {
        return !!ComponentReflector.getSymbol(componentCtor);
    }

    static getInitializers(targetCtor: ComponentImpl<any>): Array<BeanInitializer> {
        return Reflect.get(targetCtor, COMPONENT_INITIALIZERS) || [];
    }

    static addInitializer(targetCtor: ComponentImpl<any>, initializer: BeanInitializer): void {
        const initializers = ComponentReflector.getInitializers(targetCtor);
        initializers.push(initializer);
        Reflect.set(targetCtor, COMPONENT_INITIALIZERS, initializers);
    }

    static callInitializers(initializers: Array<BeanInitializer>, instance: any): void {
        initializers.forEach(initializer => initializer(instance));
    }

    static getConstructorArgumentInitializers(targetCtor: ComponentImpl<any>): Array<ConstructorArgumentInitializer> {
        return Reflect.get(targetCtor, CONSTRUCTOR_ARGUMENT_INITIALIZERS) || [];
    }

    static addConstructorArgumentInitializer(
        targetCtor: ComponentImpl<any>,
        initializer: ConstructorArgumentInitializerFunction,
        argumentIndex: number
    ): void {
        const initializers = ComponentReflector.getConstructorArgumentInitializers(targetCtor);
        initializers.push({
            initializer,
            argumentIndex
        });
        Reflect.set(targetCtor, CONSTRUCTOR_ARGUMENT_INITIALIZERS, initializers);
    }
}