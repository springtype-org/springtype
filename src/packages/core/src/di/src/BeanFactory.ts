import {ComponentReflector} from "./ComponentReflector";
import {InjectionProfile} from './enum/InjectionProfile';
import {InjectionStrategy} from "./enum/InjectionStrategy";
import {ComponentImpl} from "./interface/ComponentImpl";
import {ConstructorArgumentInitializer} from "./interface/ConstructorArgumentInitializer";
import {ArgumentInjectionMetadata} from "./interface/ArgumentInjectionMetadata";
import {BeanConfig} from "./interface/BeanConfig";

const PRIMITIVE_TYPE_NAMES = ['Number', 'Array', 'String', 'Boolean', 'RegExp', 'Date'];

export class BeanFactory {

    registry = {};
    singletonInstances = {};

    getBean<T extends ComponentImpl<any>>(
        componentCtor: T,
        injectionMetaData?: ArgumentInjectionMetadata,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT): any {

        const originalCtor = componentCtor;

        // validate component reference
        componentCtor = this.getComponent(componentCtor);

        if (!componentCtor || !ComponentReflector.isComponent(componentCtor)) {

            return BeanFactory.solveUnresolvableBean(
                originalCtor
            );
        }

        // web component injected via "st-inject"
        if (componentCtor.prototype instanceof HTMLElement) {
            return componentCtor;
        }

        const classSymbol = ComponentReflector.getSymbol(componentCtor);
        const beanConfig = ComponentReflector.getConfig(componentCtor);

       const injectionStrategy = BeanFactory.getInjectionStrategy(beanConfig, injectionMetaData);

        if (injectionProfile === InjectionProfile.TEST &&
            beanConfig &&
            beanConfig.mockedBy &&
            ComponentReflector.isComponent(beanConfig.mockedBy)) {

            componentCtor = this.getComponent(beanConfig.mockedBy);

            ComponentReflector.setIsMockComponent(componentCtor);
        }

        // only in case of singleton instance retrieval,
        // try to fetch from cache, otherwise directly head to new instance creation
        if (injectionStrategy === InjectionStrategy.SINGLETON) {

            const singletonInstance = this.getSingletonBeanInstance(classSymbol);

            if (singletonInstance) {
                return singletonInstance;
            }
        }

        let beanInstance = new componentCtor(
            ...this.resolveConstructorArguments(componentCtor, injectionProfile)
        );

        // injectionStrategy === InjectionStrategy.FACTORY || singleton instance not found

        this.initializeBeanInstance(beanInstance, ComponentReflector.getInitializers(componentCtor));

        if (injectionStrategy === InjectionStrategy.SINGLETON) {
            this.setSingletonBeanInstance(classSymbol, beanInstance);
        }
        return beanInstance;
    }

    setComponent(componentCtor: ComponentImpl<any>) {
        Reflect.set(this.registry, ComponentReflector.getSymbol(componentCtor), componentCtor);
    }

    getComponent(componentCtor: ComponentImpl<any>) {
        return Reflect.get(this.registry, ComponentReflector.getSymbol(componentCtor)) || null;
    }

    initializeBeanInstance(instance: any, initializers: Array<Function>) {

        initializers.forEach((initializer) => {
            initializer(instance);
        });
    }

    getSingletonBeanInstance(
        classSymbol: symbol
    ): any {
        return Reflect.get(this.singletonInstances, classSymbol);
    }

    setSingletonBeanInstance(
        classSymbol: symbol,
        beanInstance: any
    ): void {
        Reflect.set(this.singletonInstances, classSymbol, beanInstance);
    }

    resolveConstructorArguments<T extends ComponentImpl<any>>(
        componentCtor: T,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT,
    ): Array<any> {

        componentCtor = this.getComponent(componentCtor);

        // fetch constructor parameter types from reflection metadata
        const constructorParameterTypes: Array<ComponentImpl<any>> = ComponentReflector.getConstructorArgumentTypes(
            componentCtor
        );

        // and do the default round-trip to get all instances by type
        const constructorArguments = constructorParameterTypes.map((type, index) => {
                let injectionMetadata = ComponentReflector.getConstructorArgumentInjectionMetadata(componentCtor,index);
                return this.getSingleBeanInstance(
                    type,
                    index,
                    componentCtor,
                    injectionMetadata,
                    injectionProfile
                )
            }
        );

        const constructorArgumentInitializers = ComponentReflector.getConstructorArgumentInitializers(componentCtor);

        if (constructorArgumentInitializers.length) {

            constructorArgumentInitializers.forEach((initializer: ConstructorArgumentInitializer) => {

                constructorArguments[initializer.argumentIndex] = initializer.initializer(
                    constructorArguments[initializer.argumentIndex]
                );
            });
        }

        return constructorArguments;
    }

    getSingleBeanInstance<T extends ComponentImpl<any>>(
        type: ComponentImpl<any>,
        index: number,
        forComponentCtor: T,
        injectionMetaData?: ArgumentInjectionMetadata,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT
    ): ComponentImpl<any> | undefined {

        const componentCtor = this.getComponent(type);
        if (!componentCtor) {
            return;
        }

        // the component to inject (componentCtor) matches the component to inject in (forComponentCtor)
        let resultingBean;
        if (forComponentCtor === componentCtor) {

            resultingBean = BeanFactory.solveCyclicDependency(componentCtor)
        } else if (!componentCtor) {
            // bean unresolvable -> inject undefined
            resultingBean = BeanFactory.solveUnresolvableBean(type)
        } else {

            const singletonBeanInstanceFromRegistry = this.getSingletonBeanInstance(
                ComponentReflector.getSymbol(componentCtor)
            );


            if (singletonBeanInstanceFromRegistry) {
                resultingBean = singletonBeanInstanceFromRegistry
            } else {
                // follow down the rabbit hole
                resultingBean = this.getBean(componentCtor, injectionMetaData, injectionProfile)
            }

        }
        return resultingBean;

    }

    private static getInjectionStrategy(beanConfig?: BeanConfig<ComponentImpl<any>>, injectionMetaData?: ArgumentInjectionMetadata): InjectionStrategy | undefined {
        if (injectionMetaData && injectionMetaData.injectionStrategy) {
            return injectionMetaData.injectionStrategy;
        }
        if (beanConfig && beanConfig.injectionStrategy) {
            return beanConfig.injectionStrategy;
        }
    }

    static solveUnresolvableBean<T extends ComponentImpl<any>>(
        componentCtor: T
    ): any {

        // inject interfaces as empty objects
        if (componentCtor.prototype.constructor === Object) {
            return {};
        } else {

            const typeName = (<any>componentCtor).name;

            if (!typeName.match(/HTML.*Element/) && !typeName.match(/SVG.*Element/) && PRIMITIVE_TYPE_NAMES.indexOf(typeName) === -1) {
                console.warn(`The component referenced for injection is missing a @Component decorator: ${typeName}`);
            }
            return undefined;
        }
    }

    static solveCyclicDependency<T extends ComponentImpl<any>>(componentCtor: T): T {

        console.warn(`Cyclic dependency detected in @Component: ${ComponentReflector.getName(componentCtor)}`);

        return componentCtor;
    }
}