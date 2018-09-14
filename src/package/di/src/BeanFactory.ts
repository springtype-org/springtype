import {IBean} from "./decorator/Component";
import {ParameterInjectionMetaData, resolveInjectionParameterValue} from "./decorator/Inject";

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

        // infer class name via metaClassName provided by @Component decorator
        const className = requiredType.prototype.metaClassName;

        if (BeanFactory.injectionMap[className] &&
            BeanFactory.injectionMap[className][injectionProfile]) {

            // only in case of singleton instance retrieval,
            // try to fetch from cache, otherwise directly head to new instance creation
            if (injectionStrategy === InjectionStrategy.SINGLETON) {

                const beanInstanceFromRegistry = BeanFactory.getSingletonBeanInstanceFromRegistry(
                    className, injectionProfile
                );

                if (beanInstanceFromRegistry) {
                    return beanInstanceFromRegistry;
                }
            }

            // because the singleton code branch didn't return,
            // we are here to create the first instance ever or another new instance
            // -> start of the recursion -> follow the path down the rabbit hole...
            const beanInstance = new BeanFactory.injectionMap[className][injectionProfile](
                ...BeanFactory.resolveBeanConstructorArguments(className, injectionProfile)
            );
            BeanFactory.registerSingletonBeanInstance(className, beanInstance, injectionProfile);

            return beanInstance;

        } else {

            throw new Error(`Class not found: ${className} for profile ${injectionProfile}. Did you forget to add @Bean?`);
        }
    }

    static resolveBeanConstructorArguments(className: string, injectionProfile: InjectionProfile): Array<any> {

        // fetch constructor parameter types from reflection metadata
        const constructorParameterTypes: Array<IBean<any>> = BeanFactory.getConstructorParameterTypes(
            BeanFactory.injectionMap[className][injectionProfile]
        );

        // and do the default round-trip to get all instances by type
        const constructorArguments = BeanFactory.getBeansByType(
            constructorParameterTypes, injectionProfile, className
        );

        // but if there are special @Inject decorations,
        // we head to resolve them and use these values instead
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

    static registerSingletonBeanInstance(
        className: string,
        instance: any,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT
    ) {

        if (!BeanFactory.beanInstanceMap[className]) {
            BeanFactory.beanInstanceMap[className] = {};
        }

        // take care it doesn't happen twice. First call wins. End of the story.
        if (!BeanFactory.beanInstanceMap[className][injectionProfile]) {
            BeanFactory.beanInstanceMap[className][injectionProfile] = instance;
        }
    }

    static getSingletonBeanInstanceFromRegistry(
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

                const singletonBeanInstanceFromRegistry = BeanFactory.getSingletonBeanInstanceFromRegistry(
                    ctor.prototype.metaClassName, injectionProfile
                );

                // console.log('ctor', ctor.prototype.metaClassName, 'resolved to', beanInstanceFromRegistry);

                if (singletonBeanInstanceFromRegistry) {

                    beans.push(singletonBeanInstanceFromRegistry)

                } else {

                    // recursions end -> class points to itself -> create instance -> register instance!
                    if (ctor.prototype.metaClassName == ctor.prototype.metaClassName) {

                        //console.log('getBean()', ctor.name, ctor);

                        const beanInstance = new ctor();

                        // console.log('registering bean by name (singleton)', ctor.prototype.metaClassName, beanInstance);

                        // if a bean is unresolvable, it's metaClassName is undefined,
                        // do not register instances in this case
                        if (typeof ctor.prototype.metaClassName != 'undefined') {

                            BeanFactory.registerSingletonBeanInstance(ctor.prototype.metaClassName, beanInstance, injectionProfile);

                            beans.push(
                                beanInstance
                            )
                        }
                    } else {

                        beans.push(

                            // -> follow it down the rabbit hole
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