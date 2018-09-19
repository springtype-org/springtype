import "reflect-metadata";
import {BeanFactory, InjectionProfile} from "../BeanFactory";
import {
    INJECT_DECORATOR_METADATA_KEY,
    ParameterInjectionMetaData,
} from "./Inject";

export const CLASS_IDENTIFIER = Symbol('CLASS_IDENTIFIER');
export const CLASS_NAME = Symbol('CLASS_NAME');

export interface BeanConfig {
    injectionProfile: InjectionProfile;
}

export interface IBean<T> extends Function {
    new(...args: any[]): T;
    metaClassName?: string;
}

export function Component(beanConfig?: BeanConfig) {

    return function<T extends IBean<any>>(target: T) {

        const selfInjectionProfile = beanConfig && beanConfig.injectionProfile ?
            beanConfig.injectionProfile : InjectionProfile.DEFAULT;

        // by providing the class name in the prototype,
        // the name is carried on the constructor function's prototype
        // and preserved "as is" for later use, even tho the class
        // gets replaced by injectionClass down below
        // and it's constructor function gets overridden,
        // resulting in a generic name for the class
        target.prototype.metaClassName = target.name;

        // defines a unique class identifier which allows for
        // having more than one class with the same name
        // still able to be distinguished
        /*
        Object.defineProperty(target.prototype, CLASS_IDENTIFIER, {
            value: Symbol(target.name),
            writable: false,
            enumerable: false
        });
        */

        target.prototype[CLASS_IDENTIFIER] = Symbol(target.name);
        target.prototype[CLASS_NAME] = target.name;

        // defines the class name next to the identifier
        /*
        Object.defineProperty(target.prototype, CLASS_NAME, {
            value: target.name,
            writable: false,
            enumerable: false
        });
        */

        // register this class with the BeanFactory, so it knows about it
        // allowing all subsequent classes to be able to create instances of us
        BeanFactory.registerBean(target.name, target, selfInjectionProfile);
        BeanFactory.registerBeanSymbol(target, selfInjectionProfile);

        // @Inject decorators that may be defined inside of the class definition
        // this @Component decorator is bound to, are processed first.
        // This call collects it's meta data so the BeanFactory can
        // handle the constructor parameter value injection correctly.
        const parameterInjectionMetaData: ParameterInjectionMetaData = Reflect.getOwnMetadata(
            INJECT_DECORATOR_METADATA_KEY, target, target.name
        );
        BeanFactory.registerBeanConstructorInjectionMetadata(target.name, parameterInjectionMetaData);

        // a generic intermediate class is conjured, inheriting the class
        // the decorator is bound to. This keeps the prototype chain and later
        // instanceof checks sane. It is necessary, because we want to
        // *replace* the constructor with one that resolves it's arguments by itself (injection)
        // and is capable of even handling @Inject decorators in it constructor parameters (wohoo)
        const injectionClass = class extends target {
            constructor(...args: Array<any>) {
                super(...BeanFactory.resolveBeanConstructorArguments(target.name, selfInjectionProfile ));
            }
        };

        // not copying the original prototype back to the class would result in
        // direct instanceof returning false. Bad idea.
        injectionClass.prototype = target.prototype;

        // And no, we don't wanna loose the original class name
        injectionClass.prototype.metaClassName = target.name;

        // just replace the original class declaration by our generic one
        return injectionClass;
    }

}