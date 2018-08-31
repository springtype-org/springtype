import "reflect-metadata";
import {BeanFactory, InjectionProfile} from "./BeanFactory";

export interface BeanConfig {
    injectionProfile: InjectionProfile;
}

export interface IBean<T> extends Function {
    new(...args: any[]): T;
    metaClassName?: string;
}
export function Bean(beanConfig?: BeanConfig) {

    return function<T extends IBean<any>>(target: T) {

        BeanFactory.registerBean(target.name, target);

        target.prototype.metaClassName = target.name;

        if (beanConfig && beanConfig.injectionProfile) {
            BeanFactory.registerBean(target.name, target, beanConfig.injectionProfile);
        }

        const selfInjectionProfile = beanConfig && beanConfig.injectionProfile ?
            beanConfig.injectionProfile : InjectionProfile.DEFAULT;

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