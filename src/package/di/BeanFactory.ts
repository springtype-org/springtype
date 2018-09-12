import {IBean} from "./Bean";

export enum InjectionProfile {
    DEFAULT = 'DEFAULT',
    TEST = 'TEST',
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


    private static getConstructorParameterTypes(target: IBean<any>): Array<IBean<any>> {
        return Reflect.getMetadata("design:paramtypes", target) || [];
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
        className: string,
        requiredType: Function,
        injectionProfile: InjectionProfile = InjectionProfile.DEFAULT): T {


        if (BeanFactory.injectionMap[className] &&
            BeanFactory.injectionMap[className][injectionProfile]) {

            const beanInstanceFromRegistry = BeanFactory.getBeanInstanceFromRegistry(
                className, injectionProfile
            );

            if (beanInstanceFromRegistry) {
                return beanInstanceFromRegistry;
            }

            const beanInstance = new BeanFactory.injectionMap[className][injectionProfile](
                ...BeanFactory.resolveBeanConstructorArguments(className, injectionProfile)
            );

            BeanFactory.registerBeanInstance(className, beanInstance, injectionProfile);

            return beanInstance;

        } else {

            throw new Error("Class not found: " + className + " for profile " + injectionProfile);
        }
    }

    static resolveBeanConstructorArguments(className: string, injectionProfile: InjectionProfile): Array<any> {

        // fetch constructor parameter types
        const constructorParameterTypes: Array<IBean<any>> = BeanFactory.getConstructorParameterTypes(
            BeanFactory.injectionMap[className][injectionProfile]
        );

        //console.log('resolveBeanConstructorArguments', constructorParameterTypes);

        return BeanFactory.getBeansByType(
            constructorParameterTypes, injectionProfile, className
        );
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

                console.log('ctor', ctor.prototype.metaClassName, 'resolved to', beanInstanceFromRegistry);

                if (beanInstanceFromRegistry) {

                    beans.push(beanInstanceFromRegistry)

                } else {


                    if (ctor.prototype.metaClassName == ctor.prototype.metaClassName) {

                        //console.log('getBean()', ctor.name, ctor);

                        const beanInstance = new ctor();

                        console.log('registering bean by name (singleton)', ctor.prototype.metaClassName, beanInstance);

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
                            BeanFactory.getBean(ctor.prototype.metaClassName, ctor, injectionProfile)
                        );
                    }
                }
            });

            return beans;
        }
        return [];
    }
}