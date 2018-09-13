import {IBean} from "./Bean";
import {ParameterInjectionMetaData, resolveInjectionParameterValue} from "./Inject";

export enum InjectionProfile {
    DEFAULT = 'DEFAULT',
    TEST = 'TEST',
}

export enum InjectionStrategy {
    SINGLETON = 'SINGLETON',
    NEW_INSTANCE = 'NEW_INSTANCE'
}

export interface InjectionMap {
    [className: string]: {
        [injectionProfile: string]: IBean<any>;
    };
}

export class BeanFactory {

    static injectionMap: InjectionMap = {};

    static beanInstanceMap: {
        [className: string]: {
            [injectionProfile: string]: any;
        }
    } = {};

    static beanParameterMetadataMap: {
        [className: string]: ParameterInjectionMetaData;
    } = {};


    private static getConstructorParameterTypes(target: IBean<any>): Array<IBean<any>> {
        return Reflect.getMetadata('design:paramtypes', target) || [];
    }

    static registerBean(
        className: string,
        ctor: IBean<any>,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT) {

        if (!BeanFactory.injectionMap[className]) {
            BeanFactory.injectionMap[className] = {};
        }

        if (!BeanFactory.injectionMap[className][injectionProfile]) {
            BeanFactory.injectionMap[className][injectionProfile] = ctor;
        } else {
            throw new Error(
                `Bean with name ${className} is already registered. 
                Please make sure NOT to duplicate class names as it is an anti-pattern.
                Make sure, all your class names are unique.
            `);
        }
    }

    static getBean<T>(
        requiredType: Function,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT,
        injectionStrategy: InjectionStrategy = InjectionStrategy.SINGLETON): T {

        // infer class name via metaClassName provided by @Bean decorator
        const className = requiredType.prototype.metaClassName;

        if (BeanFactory.injectionMap[className] &&
            BeanFactory.injectionMap[className][injectionProfile]) {

            // only in case of singleton instance retrieval,
            // try to fetch from cache, otherwise directly head to new instance creation
            if (injectionStrategy === InjectionStrategy.SINGLETON) {

                const beanInstanceFromRegistry = BeanFactory.getBeanInstanceFromRegistry(
                    className, injectionProfile
                );

                if (beanInstanceFromRegistry) {
                    return beanInstanceFromRegistry;
                }
            }

            const beanInstance = new BeanFactory.injectionMap[className][injectionProfile](
                ...BeanFactory.resolveBeanConstructorArguments(className, injectionProfile)
            );

            BeanFactory.registerBeanInstance(className, beanInstance, injectionProfile);

            return beanInstance;

        } else {

            throw new Error(`Class not found: ${className} for profile ${injectionProfile}. Did you forget to add @Bean?`);
        }
    }

    static resolveBeanConstructorArguments(className: string, injectionProfile: InjectionProfile): Array<any> {

        // fetch constructor parameter types
        const constructorParameterTypes: Array<IBean<any>> = BeanFactory.getConstructorParameterTypes(
            BeanFactory.injectionMap[className][injectionProfile]
        );

        const constructorArguments = BeanFactory.getBeansByType(
            constructorParameterTypes, injectionProfile, className
        );

        // resolving @Inject override constructor  parameter values
        if (BeanFactory.beanParameterMetadataMap[className] &&
            BeanFactory.beanParameterMetadataMap[className].parameters &&
            BeanFactory.beanParameterMetadataMap[className].parameters.length) {

            const overrideInjectParamValues = BeanFactory.beanParameterMetadataMap[className].parameters;

            for (let i=0; i<overrideInjectParamValues.length; i++) {

                constructorArguments[overrideInjectParamValues[i].parameterIndex] =

                    resolveInjectionParameterValue(
                        BeanFactory.beanParameterMetadataMap[className],
                        overrideInjectParamValues[i].parameterIndex
                    );
            }
        }
        return constructorArguments;
    }

    static registerBeanInstance(
        className: string,
        instance: any,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT
    ) {

        if (!BeanFactory.beanInstanceMap[className]) {
            BeanFactory.beanInstanceMap[className] = {};
        }

        BeanFactory.beanInstanceMap[className][injectionProfile] = instance;
    }

    static getBeanInstanceFromRegistry(
        className: string,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT
    ): any {

        if (BeanFactory.beanInstanceMap[className] && BeanFactory.beanInstanceMap[className][injectionProfile]) {
            return BeanFactory.beanInstanceMap[className][injectionProfile];
        }
        return null;
    }

    static getBeansByType(
        types: Array<IBean<any>>,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT,
        forClassName: string
    ): Array<any> {

        if (types && types.length > 0) {

            const beans: Array<any> = [];

            types.forEach((ctor: IBean<any>) => {

                if (ctor === undefined) {
                    throw new Error("Cyclic dependency detected in class: " + forClassName);
                }

                const beanInstanceFromRegistry = BeanFactory.getBeanInstanceFromRegistry(
                    ctor.prototype.metaClassName, injectionProfile
                );

                // console.log('ctor', ctor.prototype.metaClassName, 'resolved to', beanInstanceFromRegistry);

                if (beanInstanceFromRegistry) {

                    beans.push(beanInstanceFromRegistry)

                } else {

                    if (ctor.prototype.metaClassName == ctor.prototype.metaClassName) {

                        //console.log('getBean()', ctor.name, ctor);

                        const beanInstance = new ctor();

                        // console.log('registering bean by name (singleton)', ctor.prototype.metaClassName, beanInstance);

                        // if a bean is unresolvable, it's metaClassName is undefined,
                        // do not register instances in this case
                        if (typeof ctor.prototype.metaClassName != 'undefined') {

                            BeanFactory.registerBeanInstance(ctor.prototype.metaClassName, beanInstance, injectionProfile);

                            beans.push(
                                beanInstance
                            )
                        }
                    } else {

                        beans.push(
                            BeanFactory.getBean(ctor, injectionProfile)
                        );
                    }
                }
            });

            return beans;
        }
        return [];
    }


    static registerBeanConstructorInjectionMetadata(className: string, parameterInjectionMetaData: ParameterInjectionMetaData) {

        // registering @Inject override constructor parameter values
        BeanFactory.beanParameterMetadataMap[className] = parameterInjectionMetaData;
    }
}