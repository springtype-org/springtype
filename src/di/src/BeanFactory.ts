import {IComponent} from "./decorator/Component";
import {ArgumentsInjectionMetaData, resolveInjectionParameterValue} from "./decorator/Inject";
import {ComponentReflector} from "./ComponentReflector";

export enum InjectionProfile {
    DEFAULT = 'DEFAULT',
    TEST = 'TEST',
}

export enum InjectionStrategy {
    SINGLETON = 'SINGLETON',
    NEW = 'NEW'
}

export class BeanFactory {

    registry = {};
    singletonInstances = {};

    setComponent(componentCtor: IComponent<any>) {
        Reflect.set(this.registry, ComponentReflector.getSymbol(componentCtor), componentCtor);
    }

    getComponent(componentCtor: IComponent<any>) {
        return Reflect.get(this.registry, ComponentReflector.getSymbol(componentCtor)) || null;
    }

    getBean<T extends IComponent<any>>(
        componentCtor: T,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT,
        injectionStrategy: InjectionStrategy = InjectionStrategy.SINGLETON): any {

        // validate component reference
        componentCtor = this.getComponent(componentCtor);

        if (!ComponentReflector.isComponent(componentCtor)) {

            return this.solveUnresolvableBean(
                componentCtor
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

        // injectionStrategy === InjectionStrategy.NEW || singleton instance not found

        const beanInstance = new componentCtor(
            ...this.resolveConstructorArguments(componentCtor, injectionProfile)
        );

        if (injectionStrategy === InjectionStrategy.SINGLETON) {
            this.setSingletonBeanInstance(classSymbol, beanInstance);
        }
        return beanInstance;
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

    resolveConstructorArguments<T extends IComponent<any>>(
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
        const constructorParameterTypes: Array<IComponent<any>> = ComponentReflector.getConstructorArgumentTypes(
            componentCtor
        );

        // and do the default round-trip to get all instances by type
        const constructorArguments = this.getBeans(
            constructorParameterTypes,
            componentCtor,
            injectionProfile
        );

        const constructorArgumentsParameterInjectionMetdata: ArgumentsInjectionMetaData =
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

                        resolveInjectionParameterValue(
                            constructorArgumentsParameterInjectionMetdata,
                            overrideInjectParamValues[i].index,
                            isTestComponent
                        );
                }
            }
        }

        // cache
        ComponentReflector.setResolvedConstructorArguments(componentCtor, constructorArguments);

        return constructorArguments;
    }

    getBeans<T extends IComponent<any>>(
        types: Array<IComponent<any>>,
        forComponentCtor: T,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT,
    ): Array<IComponent<any>> {

        if (types && types.length > 0) {

            const beans: Array<any> = [];

            types.forEach((_componentCtor: IComponent<any>) => {

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

    solveUnresolvableBean<T extends IComponent<any>>(
        componentCtor: T
    ): any {

        console.warn(`The component referenced for injection is missing a @Component decorator: ${componentCtor.name}`);

        return undefined;
    }

    solveCyclicDependency<T extends IComponent<any>>(componentCtor: T): T {

        console.warn(`Cyclic dependency detected in @Component: ${ComponentReflector.getName(componentCtor)}`);

        return componentCtor;
    }
}