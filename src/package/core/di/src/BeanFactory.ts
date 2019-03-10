import {ComponentReflector} from "./ComponentReflector";
import {InjectionProfile} from './enum/InjectionProfile';
import {InjectionStrategy} from "./enum/InjectionStrategy";
import {PRIMITIVE_TYPE_NAMES} from "./constant/PRIMITIVE_TYPE_NAMES";
import {ComponentImpl} from "./interface/ComponentImpl";
import {resolveInjectionArgumentValue} from "./function/resolveInjectionArgumentValue";
import {ArgumentsInjectionMetadata} from "./interface/ArgumentsInjectionMetadata";
import {ConstructorArgumentInitializer} from "./interface/ConstructorArgumentInitializer";

export class BeanFactory {

    registry = {};
    singletonInstances = {};

    getBean<T extends ComponentImpl<any>>(
        componentCtor: T,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT,
        injectionStrategy: InjectionStrategy = InjectionStrategy.SINGLETON): any {

        const originalCtor = componentCtor;

        // validate component reference
        componentCtor = this.getComponent(componentCtor);

        if (!componentCtor || !ComponentReflector.isComponent(componentCtor)) {

            return this.solveUnresolvableBean(
                originalCtor
            );
        }

        const classSymbol = ComponentReflector.getSymbol(componentCtor);
        const beanConfig = ComponentReflector.getConfig(componentCtor);

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

        // injectionStrategy === InjectionStrategy.FACTORY || singleton instance not found

        const beanInstance = new componentCtor(
            ...this.resolveConstructorArguments(componentCtor, injectionProfile)
        );

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

        const isTestComponent = ComponentReflector.getIsMockComponent(componentCtor);

        const cachedConstructorArguments = ComponentReflector.getResolvedConstructorArguments(componentCtor);

        if (cachedConstructorArguments) {
            return cachedConstructorArguments;
        }

        // fetch constructor parameter types from reflection metadata
        const constructorParameterTypes: Array<ComponentImpl<any>> = ComponentReflector.getConstructorArgumentTypes(
            componentCtor
        );

        // and do the default round-trip to get all instances by type
        const constructorArguments = this.getBeans(
            constructorParameterTypes,
            componentCtor,
            injectionProfile
        );

        const constructorArgumentsParameterInjectionMetdata: ArgumentsInjectionMetadata =
            ComponentReflector.getConstructorArgumentsInjectionMetadata(componentCtor);


        // but if there are special @Inject decorations,
        // we head to resolve them and use these values instead
        if (constructorArgumentsParameterInjectionMetdata &&
            constructorArgumentsParameterInjectionMetdata.arguments &&
            constructorArgumentsParameterInjectionMetdata.arguments.length) {

            const overrideInjectParamValues = constructorArgumentsParameterInjectionMetdata.arguments;

            for (let i = 0; i < overrideInjectParamValues.length; i++) {

                if (typeof overrideInjectParamValues[i] !== 'undefined') {

                    constructorArguments[overrideInjectParamValues[i].index] =

                        resolveInjectionArgumentValue(
                            constructorArgumentsParameterInjectionMetdata,
                            overrideInjectParamValues[i].index,
                            isTestComponent
                        );
                }
            }
        }

        const constructorArgumentInitializers = ComponentReflector.getConstructorArgumentInitializers(componentCtor);

        if (constructorArgumentInitializers.length) {

            constructorArgumentInitializers.forEach((initializer: ConstructorArgumentInitializer) => {

                constructorArguments[initializer.argumentIndex] = initializer.initializer(
                    constructorArguments[initializer.argumentIndex]
                );
            });
        }

        // cache
        ComponentReflector.setResolvedConstructorArguments(componentCtor, constructorArguments);

        return constructorArguments;
    }

    getBeans<T extends ComponentImpl<any>>(
        types: Array<ComponentImpl<any>>,
        forComponentCtor: T,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT,
    ): Array<ComponentImpl<any>> {

        if (types && types.length > 0) {

            const beans: Array<any> = [];

            types.forEach((_componentCtor: ComponentImpl<any>) => {

                const componentCtor = this.getComponent(_componentCtor);

                // the component to inject (componentCtor) matches the component to inject in (forComponentCtor)
                if (forComponentCtor === componentCtor) {

                    beans.push(
                        this.solveCyclicDependency(componentCtor)
                    );
                } else if (!componentCtor) {

                    // bean unresolvable -> inject undefined
                    beans.push(
                        this.solveUnresolvableBean(
                            _componentCtor
                        )
                    );

                } else {

                    const singletonBeanInstanceFromRegistry = this.getSingletonBeanInstance(
                        ComponentReflector.getSymbol(componentCtor)
                    );

                    if (singletonBeanInstanceFromRegistry) {

                        beans.push(singletonBeanInstanceFromRegistry)

                    } else {

                        beans.push(
                            // follow down the rabbit hole
                            this.getBean(componentCtor, injectionProfile)
                        );
                    }
                }
            });
            return beans;
        }
        return [];
    }

    solveUnresolvableBean<T extends ComponentImpl<any>>(
        componentCtor: T
    ): any {

        // inject interfaces as empty objects
        if (componentCtor.prototype.constructor === Object) {
            return {};
        } else {

            const typeName = (<any>componentCtor).name;

            if (!typeName.match(/HTML.+Element/) && PRIMITIVE_TYPE_NAMES.indexOf(typeName) === -1) {
                console.warn(`The component referenced for injection is missing a @Component decorator: ${typeName}`);
            }
            return undefined;
        }
    }

    solveCyclicDependency<T extends ComponentImpl<any>>(componentCtor: T): T {

        console.warn(`Cyclic dependency detected in @Component: ${ComponentReflector.getName(componentCtor)}`);

        return componentCtor;
    }
}