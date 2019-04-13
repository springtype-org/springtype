import {BeanConfig} from "../interface/BeanConfig";
import {ComponentReflector} from "../ComponentReflector";
import {ApplicationContext} from "../ApplicationContext";
import {ComponentImpl} from "../interface/ComponentImpl";
import {ArgumentsInjectionMetadata} from "../interface/ArgumentsInjectionMetadata";

export const INJECT_DECORATOR_METADATA_KEY = "@Inject";

export function registerBean<T extends ComponentImpl<any>>(componentCtor: T, beanConfig?: BeanConfig<T>) {

    // @Inject decorators that may be defined inside of the class definition
    // this @Component decorator is bound to, are processed first.
    // This call collects it's meta data so the BeanFactory can
    // handle the constructor parameter value injection correctly.
    const parameterInjectionMetaData: ArgumentsInjectionMetadata = Reflect.getOwnMetadata(
        INJECT_DECORATOR_METADATA_KEY, componentCtor, componentCtor.name
    );

    ComponentReflector.register(componentCtor, parameterInjectionMetaData, beanConfig);

    // a generic intermediate class is conjured, inheriting the class
    // the decorator is bound to. This keeps the prototype chain and later
    // instanceof checks sane. It is necessary, because we want to
    // *replace* the constructor with one that resolves it's arguments by itself (injection)
    // and is capable of even handling @Inject decorators in it constructor arguments (wohoo)
    const InjectionClassProxy = class extends componentCtor {
        constructor(...args: Array<any>) {
            super(...ApplicationContext.getInstance().resolveConstructorArguments(componentCtor));
        }
    };

    ComponentReflector.registerDerived(componentCtor, InjectionClassProxy);

    ApplicationContext.getInstance().setComponent(InjectionClassProxy);

    // just replace the original class declaration by our generic one
    return InjectionClassProxy;
}