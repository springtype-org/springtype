import "reflect-metadata";
import {
    INJECT_DECORATOR_METADATA_KEY,
    ArgumentsInjectionMetaData,
} from "./Inject";
import {ComponentReflector} from "../ComponentReflector";
import {ApplicationContext} from "../ApplicationContext";

export interface BeanConfig<T extends IComponent<any>> {

    // reference to the component that should be used in test
    mockedBy?: T;
}

export interface IComponent<T> extends Function {
    new(...args: any[]): T;
}

function registerBean<T extends IComponent<any>>(componentCtor: T, beanConfig?: BeanConfig<T>) {

    // @Inject decorators that may be defined inside of the class definition
    // this @Component decorator is bound to, are processed first.
    // This call collects it's meta data so the BeanFactory can
    // handle the constructor parameter value injection correctly.
    const parameterInjectionMetaData: ArgumentsInjectionMetaData = Reflect.getOwnMetadata(
        INJECT_DECORATOR_METADATA_KEY, componentCtor, componentCtor.name
    );

    ComponentReflector.register(componentCtor, parameterInjectionMetaData, beanConfig);

    // a generic intermediate class is conjured, inheriting the class
    // the decorator is bound to. This keeps the prototype chain and later
    // instanceof checks sane. It is necessary, because we want to
    // *replace* the constructor with one that resolves it's arguments by itself (injection)
    // and is capable of even handling @Inject decorators in it constructor arguments (wohoo)
    const derivedComponentCtor = class extends componentCtor {
        constructor(...args: Array<any>) {
            super(...ApplicationContext.getInstance().resolveConstructorArguments(componentCtor));
        }
    };

    // not copying the original prototype back to the class would result in
    // direct instanceof returning false. Bad idea.
    derivedComponentCtor.prototype = componentCtor.prototype;

    ComponentReflector.registerDerived(componentCtor, derivedComponentCtor);

    ApplicationContext.getInstance().setComponent(derivedComponentCtor);

    // just replace the original class declaration by our generic one
    return derivedComponentCtor;
}

export function Component<T extends IComponent<any>>(beanConfigOrCtor?: BeanConfig<T>|T): T|any {

    // called with @Component - no beanConfig object
    if (!(typeof beanConfigOrCtor === 'function')) {

        return (target: T) => {
            return registerBean(target, <BeanConfig<T>> beanConfigOrCtor);
        }

    } else {

        // called with @Component() or @Component({ ... })
        return registerBean(<T> beanConfigOrCtor);
    }
}