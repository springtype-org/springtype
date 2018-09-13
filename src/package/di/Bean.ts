import "reflect-metadata";
import {BeanFactory, InjectionProfile} from "./BeanFactory";
import {
    INJECT_DECORATOR_METADATA_KEY,
    ParameterInjectionMetaData,
} from "./Inject";

export interface BeanConfig {
    injectionProfile: InjectionProfile;
}

export interface IBean<T> extends Function {
    new(...args: any[]): T;
    metaClassName?: string;
}

export function Bean(beanConfig?: BeanConfig) {

    return function<T extends IBean<any>>(target: T) {

        const selfInjectionProfile = beanConfig && beanConfig.injectionProfile ?
            beanConfig.injectionProfile : InjectionProfile.DEFAULT;

        target.prototype.metaClassName = target.name;

        BeanFactory.registerBean(target.name, target, selfInjectionProfile);

        const parameterInjectionMetaData: ParameterInjectionMetaData = Reflect.getOwnMetadata(
            INJECT_DECORATOR_METADATA_KEY, target, target.name
        );

        BeanFactory.registerBeanConstructorInjectionMetadata(target.name, parameterInjectionMetaData);

        const injectionClass = class extends target {
            constructor(...args: Array<any>) {
                super(...BeanFactory.resolveBeanConstructorArguments(target.name, selfInjectionProfile ));
            }
        };

        injectionClass.prototype = target.prototype;
        injectionClass.prototype.metaClassName = target.name;

        return injectionClass;
    }

}