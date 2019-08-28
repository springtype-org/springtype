FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("integration-todo/src/index.jsx", function(exports, require, module){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const translation_config_1 = require("./translation-config");
let Index = class Index extends HTMLElement {
    constructor(appTranslation) {
        super();
        this.appTranslation = appTranslation;
    }
    render() {
        // use the router for this app
        return core_1.ActiveRenderer.createElement("st-router-outlet", null);
    }
};
Index = tslib_1.__decorate([
    core_1.WebComponent('example-todo-mvc'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof translation_config_1.AppTranslationConfig !== "undefined" && translation_config_1.AppTranslationConfig) === "function" ? _a : Object])
], Index);
exports.Index = Index;
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./environment/index"), exports);
tslib_1.__exportStar(require("./di/index"), exports);
tslib_1.__exportStar(require("./hmr/index"), exports);
tslib_1.__exportStar(require("./lang/index"), exports);
tslib_1.__exportStar(require("./logger/index"), exports);
tslib_1.__exportStar(require("./virtualdom/index"), exports);
tslib_1.__exportStar(require("./renderer/index"), exports);
tslib_1.__exportStar(require("./tss/index"), exports);
tslib_1.__exportStar(require("./cd/index"), exports);
tslib_1.__exportStar(require("./webcomponent/index"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/environment/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/function/isInProductionMode"), exports);
tslib_1.__exportStar(require("./src/enum/ApplicationEnvironment"), exports);
tslib_1.__exportStar(require("./src/enum/ApplicationRuntime"), exports);
tslib_1.__exportStar(require("./src/function/getRuntime"), exports);
tslib_1.__exportStar(require("./src/function/getRuntimeGlobalObject"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/environment/src/function/isInProductionMode.js", function(exports, require, module){
var process = require("process");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInProductionMode = () => process.env.NODE_ENV !== 'production';
//# sourceMappingURL=isInProductionMode.js.map
});
___scope___.file("core/src/environment/src/enum/ApplicationEnvironment.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationEnvironment;
(function (ApplicationEnvironment) {
    ApplicationEnvironment["PRODUCTION"] = "PRODUCTION";
    ApplicationEnvironment["E2E_TEST"] = "E2E_TEST";
    ApplicationEnvironment["INTEGRATION_TEST"] = "INTEGRATION_TEST";
    ApplicationEnvironment["STAGING"] = "STAGING";
    ApplicationEnvironment["DEV"] = "DEV";
})(ApplicationEnvironment = exports.ApplicationEnvironment || (exports.ApplicationEnvironment = {}));
//# sourceMappingURL=ApplicationEnvironment.js.map
});
___scope___.file("core/src/environment/src/enum/ApplicationRuntime.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRuntime;
(function (ApplicationRuntime) {
    ApplicationRuntime["WEBBROWSER"] = "WEBBROWSER";
    ApplicationRuntime["NODE"] = "NODE";
})(ApplicationRuntime = exports.ApplicationRuntime || (exports.ApplicationRuntime = {}));
//# sourceMappingURL=ApplicationRuntime.js.map
});
___scope___.file("core/src/environment/src/function/getRuntime.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationRuntime_1 = require("../enum/ApplicationRuntime");
exports.getRuntime = () => {
    if (typeof window != 'undefined') {
        return ApplicationRuntime_1.ApplicationRuntime.WEBBROWSER;
    }
    return ApplicationRuntime_1.ApplicationRuntime.NODE;
};
//# sourceMappingURL=getRuntime.js.map
});
___scope___.file("core/src/environment/src/function/getRuntimeGlobalObject.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRuntime_1 = require("./getRuntime");
const ApplicationRuntime_1 = require("../enum/ApplicationRuntime");
exports.getRuntimeGlobalObject = () => {
    // Note: maybe use globalThis someday (when the standard API is stable)
    switch (getRuntime_1.getRuntime()) {
        case ApplicationRuntime_1.ApplicationRuntime.WEBBROWSER:
            if (!window['$st']) {
                window['$st'] = {};
            }
            return window.$st;
    }
    // return local object context
    return {};
};
//# sourceMappingURL=getRuntimeGlobalObject.js.map
});
___scope___.file("core/src/di/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/ApplicationContext"), exports);
tslib_1.__exportStar(require("./src/BeanFactory"), exports);
tslib_1.__exportStar(require("./src/ComponentReflector"), exports);
tslib_1.__exportStar(require("./src/decorator/Component"), exports);
tslib_1.__exportStar(require("./src/decorator/Autowired"), exports);
tslib_1.__exportStar(require("./src/decorator/Inject"), exports);
tslib_1.__exportStar(require("./src/interface/ComponentImpl"), exports);
tslib_1.__exportStar(require("./src/AbstractWeakMapReflector"), exports);
tslib_1.__exportStar(require("./src/enum/InjectionProfile"), exports);
tslib_1.__exportStar(require("./src/enum/InjectionStrategy"), exports);
tslib_1.__exportStar(require("./src/decorator/Module"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/di/src/ApplicationContext.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BeanFactory_1 = require("./BeanFactory");
const environment_1 = require("../../environment");
const APPLICATION_CONTEXT = 'APPLICATION_CONTEXT';
class ApplicationContext extends BeanFactory_1.BeanFactory {
    constructor() {
        super(...arguments);
        this.environment = environment_1.ApplicationEnvironment.DEV;
        this.config = {};
    }
    setEnvironment(environment) {
        this.environment = environment;
    }
    getEnvironment() {
        return this.environment;
    }
    static setGlobal(name, value) {
        environment_1.getRuntimeGlobalObject()[name] = value;
    }
    static getGlobal(name) {
        return environment_1.getRuntimeGlobalObject()[name];
    }
    static getInstance() {
        let globalContext = ApplicationContext.getGlobal(APPLICATION_CONTEXT);
        if (!globalContext) {
            globalContext = new ApplicationContext();
            ApplicationContext.setGlobal(APPLICATION_CONTEXT, globalContext);
        }
        return globalContext;
    }
    set(name, value) {
        Reflect.set(this.config, name, value);
    }
    get(name) {
        return Reflect.get(this.config, name);
    }
}
exports.ApplicationContext = ApplicationContext;
//# sourceMappingURL=ApplicationContext.js.map
});
___scope___.file("core/src/di/src/BeanFactory.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("./ComponentReflector");
const InjectionProfile_1 = require("./enum/InjectionProfile");
const InjectionStrategy_1 = require("./enum/InjectionStrategy");
const resolveInjectionArgumentValue_1 = require("./function/resolveInjectionArgumentValue");
const PRIMITIVE_TYPE_NAMES = ['Number', 'Array', 'String', 'Boolean', 'RegExp', 'Date'];
class BeanFactory {
    constructor() {
        this.registry = {};
        this.singletonInstances = {};
    }
    getBean(componentCtor, injectionProfile = InjectionProfile_1.InjectionProfile.DEFAULT, injectionStrategy = InjectionStrategy_1.InjectionStrategy.SINGLETON) {
        const originalCtor = componentCtor;
        // validate component reference
        componentCtor = this.getComponent(componentCtor);
        if (!componentCtor || !ComponentReflector_1.ComponentReflector.isComponent(componentCtor)) {
            return this.solveUnresolvableBean(originalCtor);
        }
        // web component injected via "st-inject"
        if (componentCtor.prototype instanceof HTMLElement) {
            return componentCtor;
        }
        const classSymbol = ComponentReflector_1.ComponentReflector.getSymbol(componentCtor);
        const beanConfig = ComponentReflector_1.ComponentReflector.getConfig(componentCtor);
        if (injectionProfile === InjectionProfile_1.InjectionProfile.TEST &&
            beanConfig &&
            beanConfig.mockedBy &&
            ComponentReflector_1.ComponentReflector.isComponent(beanConfig.mockedBy)) {
            componentCtor = this.getComponent(beanConfig.mockedBy);
            ComponentReflector_1.ComponentReflector.setIsMockComponent(componentCtor);
        }
        // only in case of singleton instance retrieval,
        // try to fetch from cache, otherwise directly head to new instance creation
        if (injectionStrategy === InjectionStrategy_1.InjectionStrategy.SINGLETON) {
            const singletonInstance = this.getSingletonBeanInstance(classSymbol);
            if (singletonInstance) {
                return singletonInstance;
            }
        }
        // injectionStrategy === InjectionStrategy.FACTORY || singleton instance not found
        const beanInstance = new componentCtor(...this.resolveConstructorArguments(componentCtor, injectionProfile));
        this.initializeBeanInstance(beanInstance, ComponentReflector_1.ComponentReflector.getInitializers(componentCtor));
        if (injectionStrategy === InjectionStrategy_1.InjectionStrategy.SINGLETON) {
            this.setSingletonBeanInstance(classSymbol, beanInstance);
        }
        return beanInstance;
    }
    setComponent(componentCtor) {
        Reflect.set(this.registry, ComponentReflector_1.ComponentReflector.getSymbol(componentCtor), componentCtor);
    }
    getComponent(componentCtor) {
        return Reflect.get(this.registry, ComponentReflector_1.ComponentReflector.getSymbol(componentCtor)) || null;
    }
    initializeBeanInstance(instance, initializers) {
        initializers.forEach((initializer) => {
            initializer(instance);
        });
    }
    getSingletonBeanInstance(classSymbol) {
        return Reflect.get(this.singletonInstances, classSymbol);
    }
    setSingletonBeanInstance(classSymbol, beanInstance) {
        Reflect.set(this.singletonInstances, classSymbol, beanInstance);
    }
    resolveConstructorArguments(componentCtor, injectionProfile = InjectionProfile_1.InjectionProfile.DEFAULT) {
        componentCtor = this.getComponent(componentCtor);
        const isTestComponent = ComponentReflector_1.ComponentReflector.getIsMockComponent(componentCtor);
        const cachedConstructorArguments = ComponentReflector_1.ComponentReflector.getResolvedConstructorArguments(componentCtor);
        if (cachedConstructorArguments) {
            return cachedConstructorArguments;
        }
        // fetch constructor parameter types from reflection metadata
        const constructorParameterTypes = ComponentReflector_1.ComponentReflector.getConstructorArgumentTypes(componentCtor);
        // and do the default round-trip to get all instances by type
        const constructorArguments = this.getBeans(constructorParameterTypes, componentCtor, injectionProfile);
        const constructorArgumentsParameterInjectionMetadata = ComponentReflector_1.ComponentReflector.getConstructorArgumentsInjectionMetadata(componentCtor);
        // but if there are special @Inject decorations,
        // we head to resolve them and use these values instead
        if (constructorArgumentsParameterInjectionMetadata &&
            constructorArgumentsParameterInjectionMetadata.arguments &&
            constructorArgumentsParameterInjectionMetadata.arguments.length) {
            const overrideInjectParamValues = constructorArgumentsParameterInjectionMetadata.arguments;
            for (let i = 0; i < overrideInjectParamValues.length; i++) {
                if (typeof overrideInjectParamValues[i] !== 'undefined') {
                    constructorArguments[overrideInjectParamValues[i].index] =
                        resolveInjectionArgumentValue_1.resolveInjectionArgumentValue(constructorArgumentsParameterInjectionMetadata, overrideInjectParamValues[i].index, isTestComponent);
                }
            }
        }
        const constructorArgumentInitializers = ComponentReflector_1.ComponentReflector.getConstructorArgumentInitializers(componentCtor);
        if (constructorArgumentInitializers.length) {
            constructorArgumentInitializers.forEach((initializer) => {
                constructorArguments[initializer.argumentIndex] = initializer.initializer(constructorArguments[initializer.argumentIndex]);
            });
        }
        // cache
        ComponentReflector_1.ComponentReflector.setResolvedConstructorArguments(componentCtor, constructorArguments);
        return constructorArguments;
    }
    getBeans(types, forComponentCtor, injectionProfile = InjectionProfile_1.InjectionProfile.DEFAULT) {
        if (types && types.length > 0) {
            const beans = [];
            types.forEach((_componentCtor) => {
                const componentCtor = this.getComponent(_componentCtor);
                // the component to inject (componentCtor) matches the component to inject in (forComponentCtor)
                if (forComponentCtor === componentCtor) {
                    beans.push(this.solveCyclicDependency(componentCtor));
                }
                else if (!componentCtor) {
                    // bean unresolvable -> inject undefined
                    beans.push(this.solveUnresolvableBean(_componentCtor));
                }
                else {
                    const singletonBeanInstanceFromRegistry = this.getSingletonBeanInstance(ComponentReflector_1.ComponentReflector.getSymbol(componentCtor));
                    if (singletonBeanInstanceFromRegistry) {
                        beans.push(singletonBeanInstanceFromRegistry);
                    }
                    else {
                        beans.push(
                        // follow down the rabbit hole
                        this.getBean(componentCtor, injectionProfile));
                    }
                }
            });
            return beans;
        }
        return [];
    }
    solveUnresolvableBean(componentCtor) {
        // inject interfaces as empty objects
        if (componentCtor.prototype.constructor === Object) {
            return {};
        }
        else {
            const typeName = componentCtor.name;
            if (!typeName.match(/HTML.*Element/) && !typeName.match(/SVG.*Element/) && PRIMITIVE_TYPE_NAMES.indexOf(typeName) === -1) {
                console.warn(`The component referenced for injection is missing a @Component decorator: ${typeName}`);
            }
            return undefined;
        }
    }
    solveCyclicDependency(componentCtor) {
        console.warn(`Cyclic dependency detected in @Component: ${ComponentReflector_1.ComponentReflector.getName(componentCtor)}`);
        return componentCtor;
    }
}
exports.BeanFactory = BeanFactory;
//# sourceMappingURL=BeanFactory.js.map
});
___scope___.file("core/src/di/src/function/resolveInjectionArgumentValue.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("../ComponentReflector");
const ApplicationContext_1 = require("../ApplicationContext");
const InjectionProfile_1 = require("../enum/InjectionProfile");
function resolveInjectionArgumentValue(argumentsInjectionMetaData, index, isTestComponent) {
    let injectionValue;
    if (!argumentsInjectionMetaData.arguments[index])
        return;
    const injectionReference = argumentsInjectionMetaData.arguments[index].injectionReference;
    if (typeof injectionReference !== 'undefined') {
        if (typeof injectionReference === 'function') {
            if (ComponentReflector_1.ComponentReflector.isComponent(injectionReference)) {
                // it is not a InjectBeanFactory, just use the instance
                injectionValue = ApplicationContext_1.ApplicationContext.getInstance().getBean(injectionReference, isTestComponent ? InjectionProfile_1.InjectionProfile.TEST : InjectionProfile_1.InjectionProfile.DEFAULT, argumentsInjectionMetaData.arguments[index].injectionStrategy);
            }
            else {
                // case: function is not a InjectBeanFactory NOR registered bean -> inject function reference
                injectionValue = injectionReference;
            }
        }
        else {
            // use the value directly (any value case)
            injectionValue = injectionReference;
        }
    }
    return injectionValue;
}
exports.resolveInjectionArgumentValue = resolveInjectionArgumentValue;
//# sourceMappingURL=resolveInjectionArgumentValue.js.map
});
___scope___.file("core/src/di/src/type/InjectionReference.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=InjectionReference.js.map
});
___scope___.file("core/src/di/src/interface/ArgumentsInjectionMetadata.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ArgumentsInjectionMetadata.js.map
});
___scope___.file("core/src/di/src/interface/ArgumentInjectionMetadata.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ArgumentInjectionMetadata.js.map
});
___scope___.file("core/src/di/src/interface/ConstructorArgumentInitializer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ConstructorArgumentInitializer.js.map
});
___scope___.file("core/src/di/src/interface/ConstructorArgumentInitializerFunction.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ConstructorArgumentInitializerFunction.js.map
});
___scope___.file("core/src/di/src/ComponentReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createDefaultArgumentsInjectionMetadata_1 = require("./function/createDefaultArgumentsInjectionMetadata");
const registerBean_1 = require("./function/registerBean");
const COMPONENT = 'COMPONENT';
const COMPONENT_CONFIG = 'COMPONENT_CONFIG';
const COMPONENT_CONSTRUCTOR_PARAMETER_METADATA = 'COMPONENT_CONSTRUCTOR_PARAMETER_METADATA';
const COMPONENT_INITIALIZERS = 'COMPONENT_INITIALIZERS';
const COMPONENT_IS_MOCK_FLAG = 'COMPONENT_IS_MOCK_FLAG';
const COMPONENT_NAME = 'COMPONENT_NAME';
const CONSTRUCTOR_ARGUMENT_INITIALIZERS = 'CONSTRUCTOR_ARGUMENT_INITIALIZERS';
const RESOLVED_CONSTRUCTOR_ARGUMENTS = 'RESOLVED_CONSTRUCTOR_ARGUMENTS';
/**
 * This class uses the Reflect.metadata standard API (polyfilled)
 * to fetch and store compile-time and runtime reflected metadata.
 *
 * Calls to Reflect.getMetadata() point to TypeScript compiler generated
 * metadata. All other Reflect.* calls deal with runtime metadata (from decorators, BeanFactory).
 */
class ComponentReflector {
    static setIsMockComponent(componentCtor) {
        Reflect.set(componentCtor, COMPONENT_IS_MOCK_FLAG, true);
    }
    static getIsMockComponent(componentCtor) {
        return !!Reflect.get(componentCtor, COMPONENT_IS_MOCK_FLAG);
    }
    static getMethodArgumentTypes(componentCtor, propertyName) {
        return Reflect.getMetadata('design:paramtypes', componentCtor, propertyName) || [];
    }
    static getConstructorArgumentTypes(componentCtor) {
        return Reflect.getMetadata('design:paramtypes', componentCtor) || [];
    }
    static register(componentCtor, parameterInjectionMetadata, beanConfig) {
        Reflect.set(componentCtor, COMPONENT_CONFIG, beanConfig);
        Reflect.set(componentCtor, COMPONENT, Symbol(componentCtor.name));
        Reflect.set(componentCtor, COMPONENT_NAME, componentCtor.name);
        Reflect.set(componentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA, parameterInjectionMetadata);
    }
    static registerDerived(originalComponentCtor, derivedComponentCtor) {
        Reflect.set(derivedComponentCtor, COMPONENT, ComponentReflector.getSymbol(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_NAME, ComponentReflector.getName(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_CONFIG, ComponentReflector.getConfig(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA, ComponentReflector.getConstructorArgumentsInjectionMetadata(originalComponentCtor));
    }
    static getConstructorArgumentsInjectionMetadata(componentCtor) {
        return Reflect.get(componentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA);
    }
    static setConstructorArgumentsInjectionMetadata(targetClassInstanceOrCtor, parameterIndex, injectionReference, injectionStrategy) {
        // fetch (probably existing) meta data
        const parameterInjectionMetaData = Reflect.getOwnMetadata(registerBean_1.INJECT_DECORATOR_METADATA_KEY, targetClassInstanceOrCtor, targetClassInstanceOrCtor.name) || createDefaultArgumentsInjectionMetadata_1.createDefaultArgumentsInjectionMetadata();
        // enhance meta data for parameter
        parameterInjectionMetaData.arguments[parameterIndex] = {
            index: parameterIndex,
            injectionReference,
            injectionStrategy
        };
        // (re-)define injection reference meta data
        Reflect.defineMetadata(registerBean_1.INJECT_DECORATOR_METADATA_KEY, parameterInjectionMetaData, targetClassInstanceOrCtor, targetClassInstanceOrCtor.name);
    }
    static setMethodArgumentsInjectionMetadata(targetClassInstanceOrCtor, parameterIndex, propertyKey, injectionReference, injectionStrategy) {
        // fetch (probably existing) meta data
        const parameterInjectionMetaData = ComponentReflector.getMethodArgumentsInjectionMetadata(targetClassInstanceOrCtor, propertyKey) || createDefaultArgumentsInjectionMetadata_1.createDefaultArgumentsInjectionMetadata();
        // enhance meta data for parameter
        parameterInjectionMetaData.arguments[parameterIndex] = {
            index: parameterIndex,
            injectionReference,
            injectionStrategy
        };
        // (re-define) injection reference for parameter index
        Reflect.defineMetadata(registerBean_1.INJECT_DECORATOR_METADATA_KEY, parameterInjectionMetaData, targetClassInstanceOrCtor, propertyKey);
    }
    static getMethodArgumentsInjectionMetadata(targetClassInstanceOrCtor, propertyKey) {
        return Reflect.getOwnMetadata(registerBean_1.INJECT_DECORATOR_METADATA_KEY, targetClassInstanceOrCtor, propertyKey);
    }
    static getSymbol(targetCtor) {
        return Reflect.get(targetCtor, COMPONENT);
    }
    static getName(targetCtor) {
        return Reflect.get(targetCtor, COMPONENT_NAME);
    }
    static getConfig(targetCtor) {
        return Reflect.get(targetCtor, COMPONENT_CONFIG);
    }
    /* When constructor arguments (injections) are resolved, the result is cached for later use */
    static setResolvedConstructorArguments(targetCtor, constructorArguments) {
        Reflect.set(targetCtor, RESOLVED_CONSTRUCTOR_ARGUMENTS, constructorArguments);
    }
    static getResolvedConstructorArguments(targetCtor) {
        return Reflect.get(targetCtor, RESOLVED_CONSTRUCTOR_ARGUMENTS);
    }
    static isComponent(componentCtor) {
        return !!ComponentReflector.getSymbol(componentCtor);
    }
    static getInitializers(targetCtor) {
        return Reflect.get(targetCtor, COMPONENT_INITIALIZERS) || [];
    }
    static addInitializer(targetCtor, initializer) {
        const initializers = ComponentReflector.getInitializers(targetCtor);
        initializers.push(initializer);
        Reflect.set(targetCtor, COMPONENT_INITIALIZERS, initializers);
    }
    static callInitializers(initializers, instance) {
        initializers.forEach(initializer => initializer(instance));
    }
    static getConstructorArgumentInitializers(targetCtor) {
        return Reflect.get(targetCtor, CONSTRUCTOR_ARGUMENT_INITIALIZERS) || [];
    }
    static addConstructorArgumentInitializer(targetCtor, initializer, argumentIndex) {
        const initializers = ComponentReflector.getConstructorArgumentInitializers(targetCtor);
        initializers.push({
            initializer,
            argumentIndex
        });
        Reflect.set(targetCtor, CONSTRUCTOR_ARGUMENT_INITIALIZERS, initializers);
    }
}
exports.ComponentReflector = ComponentReflector;
//# sourceMappingURL=ComponentReflector.js.map
});
___scope___.file("core/src/di/src/interface/BeanConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=BeanConfig.js.map
});
___scope___.file("core/src/di/src/function/createDefaultArgumentsInjectionMetadata.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createDefaultArgumentsInjectionMetadata() {
    return {
        arguments: []
    };
}
exports.createDefaultArgumentsInjectionMetadata = createDefaultArgumentsInjectionMetadata;
//# sourceMappingURL=createDefaultArgumentsInjectionMetadata.js.map
});
___scope___.file("core/src/di/src/interface/BeanInitializer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=BeanInitializer.js.map
});
___scope___.file("core/src/di/src/function/registerBean.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("../ComponentReflector");
const ApplicationContext_1 = require("../ApplicationContext");
exports.INJECT_DECORATOR_METADATA_KEY = "@Inject";
function registerBean(componentCtor, beanConfig) {
    // @Inject decorators that may be defined inside of the class definition
    // this @Component decorator is bound to, are processed first.
    // This call collects it's meta data so the BeanFactory can
    // handle the constructor parameter value injection correctly.
    const parameterInjectionMetaData = Reflect.getOwnMetadata(exports.INJECT_DECORATOR_METADATA_KEY, componentCtor, componentCtor.name);
    ComponentReflector_1.ComponentReflector.register(componentCtor, parameterInjectionMetaData, beanConfig);
    // a generic intermediate class is conjured, inheriting the class
    // the decorator is bound to. This keeps the prototype chain and later
    // instanceof checks sane. It is necessary, because we want to
    // *replace* the constructor with one that resolves it's arguments by itself (injection)
    // and is capable of even handling @Inject decorators in it constructor arguments (wohoo)
    const InjectionClassProxy = class extends componentCtor {
        constructor(...args) {
            super(...ApplicationContext_1.ApplicationContext.getInstance().resolveConstructorArguments(componentCtor));
        }
    };
    ComponentReflector_1.ComponentReflector.registerDerived(componentCtor, InjectionClassProxy);
    ApplicationContext_1.ApplicationContext.getInstance().setComponent(InjectionClassProxy);
    // just replace the original class declaration by our generic one
    return InjectionClassProxy;
}
exports.registerBean = registerBean;
//# sourceMappingURL=registerBean.js.map
});
___scope___.file("core/src/di/src/decorator/Component.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// MUST be imported here
require("reflect-metadata");
const registerBean_1 = require("../function/registerBean");
function Component(beanConfigOrCtor) {
    // called with @Component - no beanConfig object
    if (!(typeof beanConfigOrCtor === 'function')) {
        return (target) => {
            return registerBean_1.registerBean(target, beanConfigOrCtor);
        };
    }
    else {
        // called with @Component() or @Component({ ... })
        return registerBean_1.registerBean(beanConfigOrCtor);
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map
});
___scope___.file("core/src/di/src/decorator/Autowired.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("../ComponentReflector");
const ApplicationContext_1 = require("../ApplicationContext");
const InjectionProfile_1 = require("../enum/InjectionProfile");
const resolveInjectionArgumentValue_1 = require("../function/resolveInjectionArgumentValue");
function Autowired(target, propertyName, descriptor) {
    const methodArgumentTypes = ComponentReflector_1.ComponentReflector.getMethodArgumentTypes(target, propertyName);
    // backup original method
    const method = descriptor.value;
    // we replace the method again, the call the original impl. with injected arguments
    descriptor.value = function () {
        const cmp = ApplicationContext_1.ApplicationContext.getInstance().getComponent(target.constructor);
        if (!cmp) {
            throw new Error('@Autowired on methods requires @Component on the class.');
        }
        const isTestComponent = ComponentReflector_1.ComponentReflector.getIsMockComponent(cmp);
        // replacement method impl. -> this is called when the actual @BeanMethod annotated method is called (hook)
        const argumentsInjectionMetaData = ComponentReflector_1.ComponentReflector.getMethodArgumentsInjectionMetadata(target, propertyName);
        const newArgs = [];
        // 1. Copy initial argument values (non-optionals, default values)
        for (let i = 0; i < arguments.length; i++) {
            newArgs[i] = arguments[i];
        }
        // 2. There might be @Inject(...) decorations, process them and inject
        if (argumentsInjectionMetaData &&
            argumentsInjectionMetaData.arguments &&
            argumentsInjectionMetaData.arguments.length) {
            // copy arguments over into new arguments array (because arguments are immutable in modern times ;)
            for (let i = 0; i < argumentsInjectionMetaData.arguments.length; i++) {
                // resolve override injection argument
                const injectionValue = resolveInjectionArgumentValue_1.resolveInjectionArgumentValue(argumentsInjectionMetaData, i, isTestComponent);
                // conditionally overwrite original call argument for sub-call
                if (typeof injectionValue !== 'undefined') {
                    newArgs[i] = injectionValue;
                }
                else if (argumentsInjectionMetaData.arguments[i]) {
                    // parameter has @Inject() decorator, but no explicit value; fallback to default strategy
                    if (methodArgumentTypes[i]) {
                        // fetch singleton from cache by reflected type
                        newArgs[i] = ApplicationContext_1.ApplicationContext.getInstance().getBean(methodArgumentTypes[i], isTestComponent ? InjectionProfile_1.InjectionProfile.TEST : InjectionProfile_1.InjectionProfile.DEFAULT, argumentsInjectionMetaData.arguments[i].injectionStrategy);
                    }
                }
            }
        }
        // 3. For all arguments that are appended optional and are not passed and not injects by @Inject(...)
        //    try to inject them using their type reference
        for (let i = arguments.length; i < methodArgumentTypes.length; i++) {
            if (typeof newArgs[i] === 'undefined' &&
                ComponentReflector_1.ComponentReflector.isComponent(methodArgumentTypes[i])) {
                newArgs[i] = ApplicationContext_1.ApplicationContext.getInstance().getBean(methodArgumentTypes[i], isTestComponent ? InjectionProfile_1.InjectionProfile.TEST : InjectionProfile_1.InjectionProfile.DEFAULT);
            }
        }
        return method.apply(this, newArgs);
    };
}
exports.Autowired = Autowired;
//# sourceMappingURL=Autowired.js.map
});
___scope___.file("core/src/di/src/decorator/Inject.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("../ComponentReflector");
const InjectionStrategy_1 = require("../enum/InjectionStrategy");
function Inject(injectionReference, injectionStrategy = InjectionStrategy_1.InjectionStrategy.SINGLETON) {
    return function (targetClassInstanceOrCtor, propertyKey, argumentIndex) {
        if (typeof targetClassInstanceOrCtor === 'function') {
            // case: param on constructor function
            ComponentReflector_1.ComponentReflector.setConstructorArgumentsInjectionMetadata(targetClassInstanceOrCtor, argumentIndex, injectionReference, injectionStrategy);
        }
        else {
            // case: param on method
            ComponentReflector_1.ComponentReflector.setMethodArgumentsInjectionMetadata(targetClassInstanceOrCtor, argumentIndex, propertyKey, injectionReference, injectionStrategy);
        }
    };
}
exports.Inject = Inject;
//# sourceMappingURL=Inject.js.map
});
___scope___.file("core/src/di/src/interface/ComponentImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ComponentImpl.js.map
});
___scope___.file("core/src/di/src/AbstractWeakMapReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = require("./ApplicationContext");
class AbstractWeakMapReflector {
    static get REFLECTOR_NAME() { return ''; }
    ;
    static setup() {
        this.state = ApplicationContext_1.ApplicationContext.getGlobal(this.REFLECTOR_NAME);
        if (!this.state) {
            this.state = new WeakMap();
            ApplicationContext_1.ApplicationContext.setGlobal(this.REFLECTOR_NAME, this.state);
        }
    }
    static set(instance, value) {
        if (!this.state)
            this.setup();
        this.state.set(instance, value);
    }
    static get(instance) {
        if (!this.state)
            this.setup();
        return this.state.get(instance);
    }
    static has(instance) {
        if (!this.state)
            this.setup();
        return this.state.has(instance);
    }
}
exports.AbstractWeakMapReflector = AbstractWeakMapReflector;
//# sourceMappingURL=AbstractWeakMapReflector.js.map
});
___scope___.file("core/src/di/src/enum/InjectionProfile.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InjectionProfile;
(function (InjectionProfile) {
    InjectionProfile["DEFAULT"] = "DEFAULT";
    InjectionProfile["TEST"] = "TEST";
})(InjectionProfile = exports.InjectionProfile || (exports.InjectionProfile = {}));
//# sourceMappingURL=InjectionProfile.js.map
});
___scope___.file("core/src/di/src/enum/InjectionStrategy.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InjectionStrategy;
(function (InjectionStrategy) {
    InjectionStrategy["SINGLETON"] = "SINGLETON";
    InjectionStrategy["FACTORY"] = "FACTORY";
})(InjectionStrategy = exports.InjectionStrategy || (exports.InjectionStrategy = {}));
//# sourceMappingURL=InjectionStrategy.js.map
});
___scope___.file("core/src/di/src/decorator/Module.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Module(name, ...imports) {
    return (target) => {
        // stub impl. to be filled out by @springtype/transform, TODO
    };
}
exports.Module = Module;
//# sourceMappingURL=Module.js.map
});
___scope___.file("core/src/hmr/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/function/setupReloadOnCodeChange"), exports);
tslib_1.__exportStar(require("./src/decorator/ReloadOnCodeChange"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/hmr/src/function/setupReloadOnCodeChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupReloadOnCodeChange = (module) => {
    if (module && module.hot) {
        module.hot.dispose(() => { });
        module.hot.accept(() => {
            // make sure to hard-reload on hot module replacement
            // to prevent odd/buggy behaviour with certain build systems
            // (as cache invalidation isn't as easy as it seems to be, huh...)
            window.location.reload();
        });
    }
};
//# sourceMappingURL=setupReloadOnCodeChange.js.map
});
___scope___.file("core/src/hmr/src/decorator/ReloadOnCodeChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
// @ts-ignore
const _module = module;
function ReloadOnCodeChange(target) {
    __1.setupReloadOnCodeChange(_module);
    return target;
}
exports.ReloadOnCodeChange = ReloadOnCodeChange;
//# sourceMappingURL=ReloadOnCodeChange.js.map
});
___scope___.file("core/src/lang/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/interface/Partial"), exports);
tslib_1.__exportStar(require("./src/interface/Merge"), exports);
tslib_1.__exportStar(require("./src/interface/Omit"), exports);
tslib_1.__exportStar(require("./src/random/Randomizer"), exports);
tslib_1.__exportStar(require("./src/util/Try"), exports);
tslib_1.__exportStar(require("./src/string/CaseTransformer"), exports);
tslib_1.__exportStar(require("./src/function/buffer"), exports);
tslib_1.__exportStar(require("./src/decorator/Buffer"), exports);
tslib_1.__exportStar(require("./src/function/memoize"), exports);
tslib_1.__exportStar(require("./src/decorator/Memoize"), exports);
tslib_1.__exportStar(require("./src/function/measureSpeed"), exports);
tslib_1.__exportStar(require("./src/decorator/MeasureSpeed"), exports);
tslib_1.__exportStar(require("./src/function/isMemorizedReturnValue"), exports);
tslib_1.__exportStar(require("./src/function/delay"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/lang/src/interface/Partial.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Partial.js.map
});
___scope___.file("core/src/lang/src/interface/Merge.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Merge.js.map
});
___scope___.file("core/src/lang/src/interface/Omit.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Omit.js.map
});
___scope___.file("core/src/lang/src/random/Randomizer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class generates random numbers or strings to a given characterSet.
 */
class Randomizer {
    /**
     * Generate one random string
     * @param characterSet the characters that will be included
     * @param length the length of string
     */
    static generateString(characterSet, length) {
        let str = "";
        for (let i = 0; i < length; i++) {
            str += characterSet[~~(Math.random() * characterSet.length)];
        }
        return str;
    }
    /**
     * Generate an array of random strings
     * @param characterSet the characters that will be included
     * @param length the length of string
     * @param amount the size of generated strings
     */
    static generateStrings(characterSet, length, amount) {
        let result = new Array(amount);
        for (let i = 0; i < length; i++) {
            result[i] = Randomizer.generateString(characterSet, length);
        }
        return result;
    }
    /**
     * Generate a array of random numbers
     * @param min the minimum value
     * @param max the maximum value
     * @param amount amount the size of generated numbers
     */
    static generateNumbers(min, max, amount) {
        let result = new Array(amount);
        for (let i = 0; i < amount; i++) {
            result[i] = (Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return result;
    }
}
exports.Randomizer = Randomizer;
//# sourceMappingURL=Randomizer.js.map
});
___scope___.file("core/src/lang/src/util/Try.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Try {
    static requireNonNullDefined(value, message) {
        if (typeof value === 'undefined') {
            throw new UndefinedError(message + ' was undefined');
        }
        if (value === null) {
            throw new NullPointerError(message + ' was null');
        }
        return value;
    }
    static of(callable) {
        try {
            const result = callable();
            Try.requireNonNullDefined(result, "result");
            return new TrySuccess(result);
        }
        catch (t) {
            return new TryFailure(t);
        }
    }
    filter(predicate) {
        if (this.isSuccess()) {
            try {
                const value = this.get();
                if (!predicate(value)) {
                    return new TryFailure(new NoSuchElementError("Predicate does not hold for " + value));
                }
            }
            catch (e) {
                return new TryFailure(e);
            }
        }
        return this;
    }
    flatMap(mapper) {
        if (this.isSuccess()) {
            try {
                return Try.of(() => mapper(this.get()));
            }
            catch (t) {
                return new TryFailure(t);
            }
            finally {
            }
        }
        else {
            return new TryFailure(this.getCause());
        }
    }
    fold(ifTryFailure, ifSuccess) {
        return this.isSuccess() ? ifSuccess(this.get()) : ifTryFailure(this.getCause());
    }
    getOrElse(other) {
        return this.isSuccess() ? this.get() : other;
    }
    getOrElseGet(supplier) {
        return this.isSuccess() ? this.get() : supplier();
    }
    getOrElseThrow(exceptionProvider) {
        if (this.isSuccess()) {
            return this.get();
        }
        else {
            throw exceptionProvider(this.getCause());
        }
    }
    map(mapper) {
        if (this.isSuccess()) {
            try {
                return new TrySuccess(mapper(this.get()));
            }
            catch (t) {
                return new TryFailure(t);
            }
        }
        else {
            return new TryFailure(this.getCause());
        }
    }
    mapFailure(mapper) {
        if (this.isFailure()) {
            try {
                return new TryFailure(mapper(this.getCause()));
            }
            catch (t) {
                return new TryFailure(t);
            }
        }
        else {
            return this;
        }
    }
    onFailure(action) {
        if (this.isFailure()) {
            action(this.getCause());
        }
        return this;
    }
    onSuccess(action) {
        if (this.isSuccess()) {
            try {
                action(this.get());
            }
            catch (e) {
                return new TryFailure(e);
            }
        }
        return this;
    }
    orElse(callable) {
        if (this.isSuccess()) {
            return this;
        }
        else {
            try {
                return callable();
            }
            catch (x) {
                return new TryFailure(x);
            }
        }
    }
    recover(exceptionType, recoveryFunction) {
        if (this.isFailure()) {
            if (this.getCause().constructor === exceptionType) {
                return Try.of(() => recoveryFunction());
            }
        }
        return this;
    }
}
exports.Try = Try;
class TrySuccess extends Try {
    constructor(value) {
        super();
        this.value = value;
    }
    get() {
        return this.value;
    }
    getCause() {
        throw new UnsupportedOperationError("getCause() on Success");
    }
    isFailure() {
        return false;
    }
    isSuccess() {
        return true;
    }
    toString() {
        return "Success(" + this.value + ")";
    }
}
class TryFailure extends Try {
    constructor(cause) {
        super();
        this.cause = cause;
    }
    get() {
        throw this.cause;
    }
    getCause() {
        return this.cause;
    }
    isFailure() {
        return true;
    }
    isSuccess() {
        return false;
    }
    toString() {
        return "Failure(" + this.cause + ")";
    }
}
class NullPointerError extends Error {
    constructor(message) {
        super(message);
        this.__proto__ = NullPointerError.prototype;
    }
}
exports.NullPointerError = NullPointerError;
class UndefinedError extends Error {
    constructor(message) {
        super(message);
        this.__proto__ = UndefinedError.prototype;
    }
}
exports.UndefinedError = UndefinedError;
class NoSuchElementError extends Error {
    constructor(message) {
        super(message);
        this.__proto__ = NoSuchElementError.prototype;
    }
}
exports.NoSuchElementError = NoSuchElementError;
class UnsupportedOperationError extends Error {
    constructor(message) {
        super(message);
        this.__proto__ = UnsupportedOperationError.prototype;
    }
}
exports.UnsupportedOperationError = UnsupportedOperationError;
//# sourceMappingURL=Try.js.map
});
___scope___.file("core/src/lang/src/string/CaseTransformer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CaseTransformer {
    static kebabToCamelCase(name) {
        return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
    static camelToKebabCase(name) {
        return name.replace(/[A-Z]/g, (g) => '-' + g[0].toLowerCase());
    }
    static camelCaseToColonCase(name) {
        return name.replace(/[A-Z]/g, (g) => ':' + g[0].toLowerCase());
    }
}
exports.CaseTransformer = CaseTransformer;
//# sourceMappingURL=CaseTransformer.js.map
});
___scope___.file("core/src/lang/src/function/buffer.js", function(exports, require, module){
var buffer = require("buffer").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer = (fn, ms, returnPromise = true) => {
    let currentPromise;
    let resolveFn;
    const guaranteePromise = () => {
        if (!currentPromise) {
            currentPromise = new Promise((resolve) => {
                resolveFn = resolve;
            });
        }
        return currentPromise;
    };
    const invalidatePromise = () => {
        currentPromise = null;
    };
    const bufferedFn = function (...args) {
        let returnValue;
        let guaranteedPromise = guaranteePromise();
        // ms
        const bufferTime = Reflect.get(bufferedFn, 'BUFFER_TIME') || 0;
        const lastCallTimestamp = Reflect.get(bufferedFn, 'BUFFER_LAST_CALL') || 0;
        if (!lastCallTimestamp || lastCallTimestamp < (Date.now() - bufferTime)) {
            returnValue = fn(...args);
            Reflect.set(bufferedFn, 'BUFFER_LAST_CALL', Date.now());
            if (returnPromise) {
                resolveFn(returnValue);
            }
            invalidatePromise();
        }
        if (returnPromise) {
            return guaranteedPromise;
        }
        else {
            return returnValue;
        }
    };
    Reflect.set(bufferedFn, 'BUFFER_TIME', ms);
    return bufferedFn;
};
//# sourceMappingURL=buffer.js.map
});
___scope___.file("core/src/lang/src/decorator/Buffer.js", function(exports, require, module){
var Buffer = require("buffer").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("../function/buffer");
exports.Buffer = (ms, returnPromise = true) => {
    return function (target, methodName, descriptor) {
        descriptor.value = buffer_1.buffer(target[methodName], ms, returnPromise);
    };
};
//# sourceMappingURL=Buffer.js.map
});
___scope___.file("core/src/lang/src/function/memoize.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comparator_1 = require("../object/Comparator");
exports.memoize = (fn, ignoreArguments = []) => {
    let memoizedReturnValue;
    let previousArguments = [];
    const callFunction = (...args) => {
        memoizedReturnValue = fn(...args);
        previousArguments = args || [];
    };
    return function (...args) {
        // optimization: arguments length differ
        if (previousArguments.length !== args.length) {
            callFunction(...args);
        }
        else {
            // arguments length is the same, but contents may differ
            for (let i = 0; i < args.length; i++) {
                // may fall through by not checking certain arguments
                if (ignoreArguments.indexOf(i) !== -1)
                    continue;
                // if all arguments are equal, nothing happens (return of memoized result value)
                if (!Comparator_1.Comparator.isEqual(args[i], previousArguments[i])) {
                    callFunction(...args);
                    break;
                }
            }
        }
        if (typeof memoizedReturnValue === 'object') {
            Reflect.set(memoizedReturnValue, 'IS_MEMORIZED_RETURN_VALUE', true);
        }
        return memoizedReturnValue;
    };
};
//# sourceMappingURL=memoize.js.map
});
___scope___.file("core/src/lang/src/object/Comparator.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comparator {
    /**
     * Compares two objects by equaling all own property types and values.
     */
    static isEqual(a, b, type = CompareType.EQUAL) {
        a = Comparator.toPrimitive(a);
        b = Comparator.toPrimitive(b);
        if (a === b) {
            return true;
        }
        else if ((typeof a == "object" && a != null) &&
            (typeof b == "object" && b != null)) {
            const aKeys = Object.keys(a);
            const aKeyLength = aKeys.length;
            const bKeyLength = Object.keys(b).length;
            // same amount of properties
            if (type === CompareType.EQUAL && aKeyLength !== bKeyLength
                // length of properties of a bigger than properties are missing
                || type === CompareType.PARTIALLY_EQUAL && aKeyLength > bKeyLength) {
                return false;
            }
            for (const prop of aKeys) {
                // check if b has the property of a and check the value
                if (b.hasOwnProperty(prop) &&
                    Comparator.isEqual(a[prop], b[prop], type)) {
                    continue;
                }
                // don't has the property or not equal
                return false;
            }
            // everything is equal
            return true;
        }
        // maybe null or undefined
        return false;
    }
    static toPrimitive(value) {
        if (value !== null && typeof value === 'object') {
            return value.valueOf();
        }
        return value;
    }
}
exports.Comparator = Comparator;
var CompareType;
(function (CompareType) {
    CompareType[CompareType["PARTIALLY_EQUAL"] = 0] = "PARTIALLY_EQUAL";
    CompareType[CompareType["EQUAL"] = 1] = "EQUAL";
})(CompareType = exports.CompareType || (exports.CompareType = {}));
//# sourceMappingURL=Comparator.js.map
});
___scope___.file("core/src/lang/src/decorator/Memoize.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoize_1 = require("../function/memoize");
exports.Memoize = (target, methodName, descriptor) => {
    descriptor.value = memoize_1.memoize(target[methodName]);
};
//# sourceMappingURL=Memoize.js.map
});
___scope___.file("core/src/lang/src/function/measureSpeed.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const buffer_1 = require("./buffer");
exports.measureSpeed = (name, fn) => {
    const aggregateTimings = buffer_1.buffer(() => {
        const callTimings = di_1.ApplicationContext.getGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP') || {};
        const callAvg = di_1.ApplicationContext.getGlobal('MEASURE_PERFORMANCE_CALL_TIME_AVERAGE') || {};
        const callAmount = di_1.ApplicationContext.getGlobal('MEASURE_PERFORMANCE_CALL_AMOUNT') || {};
        if (!callAmount[name]) {
            callAmount[name] = 0;
        }
        callAmount[name] += callTimings[name].length;
        if (callAvg[name]) {
            callTimings[name].push(callAvg[name]);
        }
        callAvg[name] = callTimings[name].reduce((previousTiming, currentTiming) => previousTiming + currentTiming)
            / (callTimings[name].length);
        // reset timing stack
        callTimings[name] = [];
        di_1.ApplicationContext.setGlobal('MEASURE_PERFORMANCE_CALL_TIME_AVERAGE', callAvg);
        di_1.ApplicationContext.setGlobal('MEASURE_PERFORMANCE_CALL_AMOUNT', callAmount);
        di_1.ApplicationContext.setGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP', callTimings);
    }, 100);
    return function (...args) {
        const callTimings = di_1.ApplicationContext.getGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP') || {};
        if (!callTimings[name]) {
            callTimings[name] = [];
        }
        const start = performance.now();
        const returnValue = fn(...args);
        const end = performance.now();
        callTimings[name].push(end - start);
        di_1.ApplicationContext.setGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP', callTimings);
        aggregateTimings();
        return returnValue;
    };
};
//# sourceMappingURL=measureSpeed.js.map
});
___scope___.file("core/src/lang/src/decorator/MeasureSpeed.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const measureSpeed_1 = require("../function/measureSpeed");
exports.MeasureSpeed = (target, methodName, descriptor) => {
    descriptor.value = measureSpeed_1.measureSpeed(target.constructor.name + '.' + methodName, target[methodName]);
};
//# sourceMappingURL=MeasureSpeed.js.map
});
___scope___.file("core/src/lang/src/function/isMemorizedReturnValue.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMemorizedReturnValue = (value) => {
    return Reflect.get(value, 'IS_MEMORIZED_RETURN_VALUE');
};
//# sourceMappingURL=isMemorizedReturnValue.js.map
});
___scope___.file("core/src/lang/src/function/delay.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = (fn, ms) => {
    return function (...args) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fn(...args));
            }, ms);
        });
    };
};
//# sourceMappingURL=delay.js.map
});
___scope___.file("core/src/logger/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/ActiveLogger"), exports);
tslib_1.__exportStar(require("./src/decorator/Logger"), exports);
tslib_1.__exportStar(require("./src/interface/LoggerConfig"), exports);
tslib_1.__exportStar(require("./src/enum/LogLevel"), exports);
tslib_1.__exportStar(require("./src/interface/LogFilterFunction"), exports);
tslib_1.__exportStar(require("./src/function/log"), exports);
tslib_1.__exportStar(require("./src/function/info"), exports);
tslib_1.__exportStar(require("./src/function/warn"), exports);
tslib_1.__exportStar(require("./src/function/debug"), exports);
tslib_1.__exportStar(require("./src/function/error"), exports);
tslib_1.__exportStar(require("./src/function/trace"), exports);
tslib_1.__exportStar(require("./src/interface/LoggerImpl"), exports);
tslib_1.__exportStar(require("./src/context/logger"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/logger/src/ActiveLogger.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const di_1 = require("../../di");
const LogLevel_1 = require("./enum/LogLevel");
const filterByLogLevel_1 = require("./function/filterByLogLevel");
const logger_1 = require("./context/logger");
/**
 * Logger to inject which uses the decorator-provided application logger (@AppLogger(...))
 * or falls back to the default configuration (default/DefaultAppLoggerConfig.ts).
 *
 * Inject this Logger in any class using:
 *
 * constructor(protected logger: Logger) { ... }
 */
let ActiveLogger = class ActiveLogger {
    filterArgs(args, methodLogLevel) {
        let filteredArgs = filterByLogLevel_1.filterByLogLevel(args, this.getLogLevel(), methodLogLevel);
        const customFilterFn = this.getFilterFunction();
        if (typeof customFilterFn === 'function') {
            filteredArgs = customFilterFn(filteredArgs);
        }
        return filteredArgs;
    }
    get loggerImpl() {
        // fetch cached instance
        if (this._loggerImpl)
            return this._loggerImpl;
        const appLoggerImpl = logger_1.getLogger();
        if (appLoggerImpl) {
            this._loggerImpl = appLoggerImpl;
        }
        return this._loggerImpl;
    }
    log(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.LOG);
        if (filteredArgs.length) {
            this.loggerImpl.log(...filteredArgs);
        }
    }
    trace(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.TRACE);
        if (filteredArgs.length) {
            this.loggerImpl.trace(...filteredArgs);
        }
    }
    error(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.ERROR);
        if (filteredArgs.length) {
            this.loggerImpl.error(...filteredArgs);
        }
    }
    warn(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.WARN);
        if (filteredArgs.length) {
            this.loggerImpl.warn(...filteredArgs);
        }
    }
    debug(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.DEBUG);
        if (filteredArgs.length) {
            this.loggerImpl.debug(...filteredArgs);
        }
    }
    info(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.INFO);
        if (filteredArgs.length) {
            this.loggerImpl.info(...filteredArgs);
        }
    }
    setLogLevel(level) {
        this.loggerImpl.setLogLevel(level);
    }
    setFilterFunction(filter) {
        this.setFilterFunction(filter);
    }
    getLogLevel() {
        return this.loggerImpl.getLogLevel();
    }
    getFilterFunction() {
        return this.loggerImpl.getFilterFunction();
    }
    ;
};
ActiveLogger = tslib_1.__decorate([
    di_1.Component
], ActiveLogger);
exports.ActiveLogger = ActiveLogger;
//# sourceMappingURL=ActiveLogger.js.map
});
___scope___.file("core/src/logger/src/function/filterByLogLevel.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getLogLevelSeverity_1 = require("./getLogLevelSeverity");
exports.filterByLogLevel = (args, logLevel, methodLogLevel) => {
    const loggingSeverity = getLogLevelSeverity_1.getLogLevelSeverity(logLevel);
    const actualMethodSeverity = getLogLevelSeverity_1.getLogLevelSeverity(methodLogLevel);
    // numb logging output because e.g. method severity (log() = LOG = 4 is lower than logging severity set (ERROR = 1)
    if (actualMethodSeverity > loggingSeverity) {
        return [];
    }
    return args;
};
//# sourceMappingURL=filterByLogLevel.js.map
});
___scope___.file("core/src/logger/src/function/getLogLevelSeverity.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
exports.getLogLevelSeverity = (logLevel) => {
    switch (logLevel) {
        case __1.LogLevel.NONE:
            return 0;
        case __1.LogLevel.ERROR:
            return 1;
        case __1.LogLevel.WARN:
            return 2;
        case __1.LogLevel.DEBUG:
            return 3;
        default:
        case __1.LogLevel.LOG:
            return 4;
        case __1.LogLevel.INFO:
            return 5;
        case __1.LogLevel.TRACE:
            return 6;
    }
};
//# sourceMappingURL=getLogLevelSeverity.js.map
});
___scope___.file("core/src/logger/src/decorator/Logger.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../context/logger");
function Logger(loggerConfig) {
    // called with @AppLogger() or @AppLogger({})
    if (!(typeof loggerConfig === 'function')) {
        return (target) => {
            logger_1.setLogger(loggerConfig);
            return target;
        };
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map
});
___scope___.file("core/src/logger/src/interface/LoggerConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LoggerConfig.js.map
});
___scope___.file("core/src/logger/src/enum/LoggerImplType.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerImplType;
(function (LoggerImplType) {
    LoggerImplType["CONSOLE"] = "CONSOLE";
})(LoggerImplType = exports.LoggerImplType || (exports.LoggerImplType = {}));
//# sourceMappingURL=LoggerImplType.js.map
});
___scope___.file("core/src/logger/src/enum/LogLevel.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// in order of chattiness
var LogLevel;
(function (LogLevel) {
    LogLevel["NONE"] = "NONE";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["WARN"] = "WARN";
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["LOG"] = "LOG";
    LogLevel["INFO"] = "INFO";
    LogLevel["TRACE"] = "TRACE";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=LogLevel.js.map
});
___scope___.file("core/src/logger/src/interface/LogFilterFunction.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LogFilterFunction.js.map
});
___scope___.file("core/src/logger/src/function/log.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const ActiveLogger_1 = require("../ActiveLogger");
exports.log = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).log(...args);
};
//# sourceMappingURL=log.js.map
});
___scope___.file("core/src/logger/src/function/info.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.info = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).info(...args);
};
//# sourceMappingURL=info.js.map
});
___scope___.file("core/src/logger/src/function/warn.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.warn = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).warn(...args);
};
//# sourceMappingURL=warn.js.map
});
___scope___.file("core/src/logger/src/function/debug.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.debug = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).debug(...args);
};
//# sourceMappingURL=debug.js.map
});
___scope___.file("core/src/logger/src/function/error.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.error = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).error(...args);
};
//# sourceMappingURL=error.js.map
});
___scope___.file("core/src/logger/src/function/trace.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.trace = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).trace(...args);
};
//# sourceMappingURL=trace.js.map
});
___scope___.file("core/src/logger/src/interface/LoggerImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LoggerImpl.js.map
});
___scope___.file("core/src/logger/src/context/logger.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const defaultLoggerConfig_1 = require("../defaultLoggerConfig");
const getLoggerImplInstance_1 = require("../function/getLoggerImplInstance");
const LOGGER = 'LOGGER';
exports.getLogger = () => {
    let loggerImpl = di_1.ApplicationContext.getInstance().get(LOGGER);
    if (!loggerImpl) {
        exports.setLogger(defaultLoggerConfig_1.defaultLoggerConfig);
    }
    return di_1.ApplicationContext.getInstance().get(LOGGER);
};
exports.setLogger = (appLoggerConfig) => {
    di_1.ApplicationContext.getInstance().set(LOGGER, getLoggerImplInstance_1.getLoggerImplInstance(appLoggerConfig));
};
//# sourceMappingURL=logger.js.map
});
___scope___.file("core/src/logger/src/defaultLoggerConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerImplType_1 = require("./enum/LoggerImplType");
const LogLevel_1 = require("./enum/LogLevel");
exports.defaultLoggerConfig = {
    type: LoggerImplType_1.LoggerImplType.CONSOLE,
    level: LogLevel_1.LogLevel.LOG
};
//# sourceMappingURL=defaultLoggerConfig.js.map
});
___scope___.file("core/src/logger/src/function/getLoggerImplInstance.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLoggerImpl_1 = require("../impl/ConsoleLoggerImpl");
const LoggerImplType_1 = require("../enum/LoggerImplType");
exports.getLoggerImplInstance = (loggerConfig) => {
    let loggerImpl;
    // custom impl provided via config
    if (loggerConfig.impl) {
        loggerImpl = loggerConfig.impl;
    }
    else {
        // using standard implementation
        switch (loggerConfig.type) {
            default:
            case LoggerImplType_1.LoggerImplType.CONSOLE:
                loggerImpl = new ConsoleLoggerImpl_1.ConsoleLoggerImpl();
                break;
        }
    }
    loggerImpl.setLogLevel(loggerConfig.level);
    loggerImpl.setFilterFunction(loggerConfig.filter);
    return loggerImpl;
};
//# sourceMappingURL=getLoggerImplInstance.js.map
});
___scope___.file("core/src/logger/src/impl/ConsoleLoggerImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../di/index");
let ConsoleLoggerImpl = class ConsoleLoggerImpl {
    setLogLevel(level) {
        this.level = level;
    }
    setFilterFunction(filter) {
        this.filter = filter;
    }
    getLogLevel() {
        return this.level;
    }
    getFilterFunction() {
        return this.filter;
    }
    ;
    log(...args) {
        console.log(...args);
    }
    trace(...args) {
        console.trace(...args);
    }
    error(...args) {
        console.error(...args);
    }
    warn(...args) {
        console.warn(...args);
    }
    debug(...args) {
        console.debug(...args);
    }
    info(...args) {
        console.info(...args);
    }
};
ConsoleLoggerImpl = tslib_1.__decorate([
    index_1.Component
], ConsoleLoggerImpl);
exports.ConsoleLoggerImpl = ConsoleLoggerImpl;
//# sourceMappingURL=ConsoleLoggerImpl.js.map
});
___scope___.file("core/src/virtualdom/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// force-import interfaces for framework and Web Standard TSX types
require("./src/interface/HTMLIntrinsicElements");
require("./src/interface/SVGIntrinsicElements");
// typing for <st-fragment>
require("./src/interface/SpringTypeFragmentElementAttributes");
// typing for <st-slot>
require("./src/interface/SpringTypeSlotElementAttributes");
tslib_1.__exportStar(require("./src/interface/VirtualElement"), exports);
tslib_1.__exportStar(require("./src/constants"), exports);
tslib_1.__exportStar(require("./src/transformation/transformElementToVirtualElement"), exports);
tslib_1.__exportStar(require("./src/transformation/transformToFlatElementList"), exports);
tslib_1.__exportStar(require("./src/transformation/VirtualDOMTransformer"), exports);
tslib_1.__exportStar(require("./src/mutation/VirtualDOMMutator"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/virtualdom/src/interface/HTMLIntrinsicElements.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=HTMLIntrinsicElements.js.map
});
___scope___.file("core/src/virtualdom/src/interface/TypedVirtualElementAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TypedVirtualElementAttributes.js.map
});
___scope___.file("core/src/virtualdom/src/interface/VirtualElementGlobalEventHandlers.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=VirtualElementGlobalEventHandlers.js.map
});
___scope___.file("core/src/virtualdom/src/interface/SVGIntrinsicElements.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=SVGIntrinsicElements.js.map
});
___scope___.file("core/src/virtualdom/src/interface/SpringTypeFragmentElementAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=SpringTypeFragmentElementAttributes.js.map
});
___scope___.file("core/src/virtualdom/src/interface/SpringTypeSlotElementAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=SpringTypeSlotElementAttributes.js.map
});
___scope___.file("core/src/virtualdom/src/interface/VirtualElement.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=VirtualElement.js.map
});
___scope___.file("core/src/virtualdom/src/constants.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAGMENT_ELEMENT_TAG_NAME = 'st-fragment';
exports.SLOT_ELEMENT_TAG_NAME = 'st-slot';
exports.LIST_KEY_ATTRIBUTE_NAME = 'key';
//# sourceMappingURL=constants.js.map
});
___scope___.file("core/src/virtualdom/src/transformation/transformElementToVirtualElement.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformElementToVirtualElement = (element) => {
    const virtualAttributes = {};
    const virtualChildren = [];
    if (element.nodeType !== Node.TEXT_NODE) {
        if (element.attributes) {
            const attributes = Array.from(element.attributes);
            for (let i = 0; i < attributes.length; i++) {
                virtualAttributes[attributes[i].name] = attributes[i].value;
            }
        }
        if (element.childNodes) {
            for (let i = 0; i < element.childNodes.length; i++) {
                virtualChildren.push(exports.transformElementToVirtualElement(element.childNodes[i]));
            }
        }
        return {
            name: element.tagName.toLowerCase(),
            attributes: virtualAttributes,
            children: virtualChildren
        };
    }
    else {
        return element.textContent || '';
    }
};
//# sourceMappingURL=transformElementToVirtualElement.js.map
});
___scope___.file("core/src/virtualdom/src/transformation/transformToFlatElementList.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToFlatElementList = (destination, tsx) => {
    if (Array.isArray(tsx)) {
        tsx.forEach(tsx => destination.push(tsx));
    }
    else {
        destination.push(tsx);
    }
};
//# sourceMappingURL=transformToFlatElementList.js.map
});
___scope___.file("core/src/virtualdom/src/transformation/VirtualDOMTransformer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../../logger");
const index_1 = require("../../index");
const lang_1 = require("../../../lang");
class VirtualDOMTransformer {
}
exports.VirtualDOMTransformer = VirtualDOMTransformer;
VirtualDOMTransformer.transformVirtualElementAttributes = (virtualElement) => {
    // transform attributes
    if (virtualElement.attributes) {
        const mutatedAttributes = {};
        for (let attributeName in virtualElement.attributes) {
            if (virtualElement.attributes.hasOwnProperty(attributeName)) {
                let mutatedAttributeName = attributeName;
                // 1. Transform React className -> class
                if (attributeName.toLowerCase() === 'classname') {
                    mutatedAttributeName = 'class';
                }
                mutatedAttributes[mutatedAttributeName] =
                    virtualElement.attributes[attributeName];
            }
        }
        virtualElement.attributes = mutatedAttributes;
    }
};
VirtualDOMTransformer.transformVirtualElementList = (parent, childrenDestination, list) => {
    for (let i = 0; i < list.length; i++) {
        if (typeof list[i] !== 'string' &&
            (!list[i].attributes || typeof list[i].attributes.key === 'undefined')) {
            logger_1.warn('The element ', parent, ' is a list (Array). Each entry in a list must have an unique "key" attribute like: key="$index". But ', list[i], 'is missing it.');
        }
        childrenDestination.push(list[i]);
    }
};
VirtualDOMTransformer.transformVirtualElementTree = lang_1.measureSpeed('transformVirtualElementTree', (virtualElement) => {
    if (typeof virtualElement === 'object') {
        VirtualDOMTransformer.transformVirtualElementAttributes(virtualElement);
        // make sure it's a true VirtualElement, not a text node and has children to walk thru
        if (virtualElement && virtualElement.children) {
            const nonFragmentChildren = [];
            // 1. Filter / aggregate elements that are not <st-fragment>'s
            for (let i = 0; i < virtualElement.children.length; i++) {
                const virtualElementChild = VirtualDOMTransformer.transformVirtualElementTree(virtualElement.children[i]);
                if (typeof virtualElementChild === 'object') {
                    if (virtualElementChild.name === index_1.FRAGMENT_ELEMENT_TAG_NAME &&
                        virtualElementChild.children && virtualElementChild.children.length) {
                        for (let j = 0; j < virtualElementChild.children.length; j++) {
                            // TODO: abstract logic
                            // flatten lists
                            if (Array.isArray(virtualElementChild.children[j])) {
                                VirtualDOMTransformer.transformVirtualElementList(virtualElement, nonFragmentChildren, virtualElementChild.children[j]);
                            }
                            else {
                                nonFragmentChildren.push(VirtualDOMTransformer.transformVirtualElementTree(virtualElementChild.children[j]));
                            }
                        }
                    }
                    else {
                        // flatten lists
                        if (Array.isArray(virtualElementChild)) {
                            VirtualDOMTransformer.transformVirtualElementList(virtualElement, nonFragmentChildren, virtualElementChild);
                        }
                        else {
                            nonFragmentChildren.push(virtualElementChild);
                        }
                    }
                }
                else {
                    nonFragmentChildren.push(virtualElementChild);
                }
            }
            virtualElement.children = nonFragmentChildren;
        }
    }
    return virtualElement;
});
//# sourceMappingURL=VirtualDOMTransformer.js.map
});
___scope___.file("core/src/virtualdom/src/mutation/VirtualDOMMutator.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const renderer_1 = require("../../../renderer");
const isWebComponent_1 = require("../../../webcomponent/src/function/isWebComponent");
const lang_1 = require("../../../lang");
const FlowIdReflector_1 = require("../../../webcomponent/src/reflector/cross-instance/FlowIdReflector");
const SlotChildrenReflector_1 = require("../../../webcomponent/src/reflector/cross-instance/SlotChildrenReflector");
class VirtualDOMMutator {
}
exports.VirtualDOMMutator = VirtualDOMMutator;
VirtualDOMMutator.cacheSlotChildren = (virtualElement, domElement) => {
    // in case a WebComponent is found, all virtual children are assigned to it's DOM element
    // so they can be assigned to <st-slot> elements inside (general purpose <slot> polyfill)
    if (virtualElement && domElement &&
        virtualElement.children && virtualElement.children.length &&
        isWebComponent_1.isWebComponent(virtualElement.name)) {
        SlotChildrenReflector_1.SlotChildrenReflector.set(domElement, virtualElement.children);
    }
};
VirtualDOMMutator.getSlotChildrenFromParentTree = (domElement) => {
    let slotChildren = SlotChildrenReflector_1.SlotChildrenReflector.get(domElement);
    if (slotChildren && slotChildren.length) {
        return slotChildren;
    }
    else if (domElement.parentNode && (FlowIdReflector_1.FlowIdReflector.has(domElement.parentNode) ||
        isWebComponent_1.isWebComponent(domElement.parentNode.tagName))) {
        return VirtualDOMMutator.getSlotChildrenFromParentTree(domElement.parentNode);
    }
    return slotChildren;
};
VirtualDOMMutator.mutateSlotElement = (parent, virtualElement) => {
    if (parent) {
        const slotChildren = VirtualDOMMutator.getSlotChildrenFromParentTree(parent);
        if (slotChildren) {
            const filteredSlotChildren = [];
            // iterate slot children
            for (let s = 0; s < slotChildren.length; s++) {
                const slotChild = slotChildren[s];
                const slotName = virtualElement.attributes ? virtualElement.attributes.name : undefined;
                if (typeof slotChild !== 'string') {
                    const slotSelectionName = slotChild.attributes ? slotChild.attributes['slot'] : undefined;
                    // in case the <st-slot> has a name="?" attribute and the slotChild has a slot="?" attribute,
                    // the slotChild is only allowed to be slotted here, if the name matches
                    if (slotName) {
                        if (slotName === slotSelectionName) {
                            filteredSlotChildren.push(...slotChild.children);
                        }
                    }
                    else if (!slotSelectionName) {
                        // in case of <slot> without name and no slot name selection
                        filteredSlotChildren.push(...slotChild.children);
                    }
                }
                else {
                    // no slot name based selection possible as it is a TextNode
                    filteredSlotChildren.push(...slotChild);
                }
            }
            // set slot children only if they match, otherwise fallback to default content
            if (filteredSlotChildren && filteredSlotChildren.length) {
                virtualElement.children = filteredSlotChildren;
            }
        }
    }
};
VirtualDOMMutator.mutateSlotChildrenElement = (domElement) => {
    // clean implicitly created elements space (slot target itself)
    domElement.childNodes.forEach((node) => {
        domElement.removeChild(node);
    });
};
VirtualDOMMutator.mutateElementTree = lang_1.memoize((domElements, virtualElements, parent, flowId) => {
    // length to walk is the bigger number of both lists (reality in DOM vs. virtual DOM)
    let maxLength = domElements.length > virtualElements.length ?
        domElements.length : virtualElements.length;
    // walk through max. possible  differences on this level of the subtree
    for (let i = 0; i < maxLength; i++) {
        // removeChild() called before and end of similarities is logically reached
        if (!virtualElements[i] && !domElements[i]) {
            break;
        }
        let domElement = domElements[i];
        if (typeof virtualElements[i] === 'object') {
            VirtualDOMMutator.mutateElement(parent, domElement, virtualElements[i], flowId);
        }
        else {
            VirtualDOMMutator.mutateTextNode(parent, domElement, virtualElements[i], flowId);
        }
    }
}, [3 /* ignore flowId in memorization check */]);
VirtualDOMMutator.mutateElement = (parent, domElement, virtualElement, flowId) => {
    // mutation result states (apart from atomic attribute changes)
    let created = false;
    let replaced = false;
    if (virtualElement && virtualElement.attributes && virtualElement.attributes.slot) {
        VirtualDOMMutator.mutateSlotChildrenElement(domElement);
        // ignore further rendering here; this gonna be rendered somewhere else
        return;
    }
    if (virtualElement && virtualElement.name === index_1.SLOT_ELEMENT_TAG_NAME) {
        // Apply <st-slot> transformation
        VirtualDOMMutator.mutateSlotElement(parent, virtualElement);
    }
    // TODO: Inform web component and hook lifecycle like @OnSlotChildrenPrepared
    // mutation options per child element on each level:
    if (!virtualElement && domElement) {
        // DOMElement existing but no such VirtualElement: Evict zombie node
        parent.removeChild(domElement);
    }
    else if (virtualElement && !domElement) {
        // VirtualElement exists but no DOMElement: Append node
        domElement = renderer_1.getRenderer().createNativeElement(virtualElement, flowId);
        created = true;
        VirtualDOMMutator.cacheSlotChildren(virtualElement, domElement);
        // this.updateAllAttributeEventListeners(virtualElement, domElement);
        // VirtualElement exists but no DOMElement: Append node
        parent.appendChild(domElement);
    }
    else if (virtualElement && domElement &&
        ((domElement.tagName || '').toUpperCase() !== virtualElement.name.toUpperCase())) {
        // DOMElement and VirtualElement existing but tagName differs: Replace node
        // also: DOMElement is a TextNode (typeof tagName == 'undefined') but VirtualElement is not
        // tag name differs, replace node
        parent.removeChild(domElement);
        domElement = renderer_1.getRenderer().createNativeElement(virtualElement, flowId);
        created = true;
        VirtualDOMMutator.cacheSlotChildren(virtualElement, domElement);
        // this.updateAllAttributeEventListeners(virtualElement, domElement);
        parent.appendChild(domElement);
    }
    else {
        // DOMElement and VirtualElement are the same on index and tagName
        // but attributes might differ: May update attributes
        // this.updateAllAttributeEventListeners(virtualElement, domElement);
        // DOMElement might have attributes that differ from VirtualElement attributes
        // Replace attribute value then
        if (domElement.attributes) {
            const attributes = Array.from(domElement.attributes);
            for (let a = 0; a < attributes.length; a++) {
                const attributeName = attributes[a].name;
                if (!attributeName.startsWith('on')) {
                    if (!virtualElement.attributes || !virtualElement.attributes[attributeName]) {
                        // DOMElement has an attribute that doesn't exist on VirtualElement attributes anymore
                        domElement.removeAttribute(attributeName);
                    }
                    else if (domElement.getAttribute(attributeName) !== virtualElement.attributes[attributeName].toString()) {
                        if (attributeName === index_1.LIST_KEY_ATTRIBUTE_NAME) {
                            const domElementReplacement = renderer_1.getRenderer().createNativeElement(virtualElement, flowId);
                            replaced = true;
                            VirtualDOMMutator.cacheSlotChildren(virtualElement, domElementReplacement);
                            // this.updateAllAttributeEventListeners(virtualElement, domElementReplacement);
                            parent.replaceChild(domElementReplacement, domElement);
                        }
                        else {
                            // DOMElement attribute value differs from VirtualElement attribute: Update
                            domElement.setAttribute(attributeName, virtualElement.attributes[attributeName]);
                        }
                    }
                }
            }
        }
        // VirtualElement might have additional attributes, DOMElement doesn't have atm
        if (!replaced && virtualElement.attributes) {
            // update attributes
            for (let attributeName in virtualElement.attributes) {
                if (virtualElement.attributes.hasOwnProperty(attributeName) &&
                    !domElement.hasAttribute(attributeName) && !attributeName.startsWith('on')) {
                    // DOMElement attribute value differs from VirtualElement attribute: Set
                    domElement.setAttribute(attributeName, virtualElement.attributes[attributeName]);
                }
            }
        }
    }
    // process children (recursion)
    // optimization: If freshly created, all children are already perfectly rendered
    // so no need to walk through all child nodes
    if ((!created && !replaced) || isWebComponent_1.isWebComponent(virtualElement.name)) {
        // parent elements must be both existing
        if (domElement && virtualElement &&
            // and at least the existing DOM subtree
            // or the virtual DOM subtree must be given
            ((domElement.childNodes && domElement.childNodes.length) ||
                (virtualElement.children && virtualElement.children.length))) {
            // recursive call with childNodes and virtualElement childNodes
            VirtualDOMMutator.mutateElementTree(domElement.childNodes || [], virtualElement.children, domElement, flowId);
        }
    }
};
VirtualDOMMutator.mutateTextNode = (parent, domElement, virtualElementTextContent, flowId) => {
    // text node content
    if (typeof virtualElementTextContent == 'undefined' && domElement) {
        // DOMElement existing but no such VirtualElement: Evict zombie node
        parent.removeChild(domElement);
    }
    else if (virtualElementTextContent && !domElement) {
        // VirtualElement exists but no DOMElement: Append node
        if (parent.nodeType === Node.TEXT_NODE) {
            parent.textContent += virtualElementTextContent;
        }
        else {
            parent.appendChild(renderer_1.getRenderer().createNativeTextNode(virtualElementTextContent, flowId));
        }
    }
    else if (virtualElementTextContent && domElement) {
        // TextNode is present on both sides but content might differ
        // update innerText
        if (domElement.nodeType === Node.TEXT_NODE) {
            // DOMElement remains being a TextNode
            // ...but has changed: Reflect the change
            if (domElement.textContent !== virtualElementTextContent) {
                domElement.textContent = virtualElementTextContent;
            }
        }
        else {
            // VirtualElement is a TextNode now but DOMElement is not: remove and replace
            parent.removeChild(domElement);
            parent.appendChild(renderer_1.getRenderer().createNativeTextNode(virtualElementTextContent, flowId));
        }
    }
};
//# sourceMappingURL=VirtualDOMMutator.js.map
});
___scope___.file("core/src/webcomponent/src/function/isWebComponent.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebComponentReflector_1 = require("../WebComponentReflector");
exports.isWebComponent = (tagName) => typeof WebComponentReflector_1.WebComponentReflector.getByTagName(tagName) != undefined;
//# sourceMappingURL=isWebComponent.js.map
});
___scope___.file("core/src/webcomponent/src/WebComponentReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../di");
const TAG_NAME = 'TAG_NAME';
const WEB_COMPONENTS_REGISTERED = 'WEB_COMPONENTS_REGISTERED';
class WebComponentReflector {
    static getTagName(component) {
        return Reflect.get(component, TAG_NAME);
    }
    static setTagName(component, tagName) {
        Reflect.set(component, TAG_NAME, tagName);
    }
    static registerByTagName(tagName, component) {
        const registeredWebComponents = WebComponentReflector.getAll();
        registeredWebComponents[tagName.toUpperCase()] = component;
        di_1.ApplicationContext.setGlobal(WEB_COMPONENTS_REGISTERED, registeredWebComponents);
    }
    static getByTagName(tagName) {
        if (!tagName)
            tagName = '';
        const registeredWebComponents = WebComponentReflector.getAll();
        return registeredWebComponents[tagName.toUpperCase()];
    }
    static getAll() {
        return di_1.ApplicationContext.getGlobal(WEB_COMPONENTS_REGISTERED) || {};
    }
}
exports.WebComponentReflector = WebComponentReflector;
//# sourceMappingURL=WebComponentReflector.js.map
});
___scope___.file("core/src/webcomponent/src/interface/RegisteredWebComponents.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RegisteredWebComponents.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/cross-instance/FlowIdReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../../di/index");
class FlowIdReflector extends index_1.AbstractWeakMapReflector {
    static get REFLECTOR_NAME() {
        return 'FlowIdReflector';
    }
    ;
    static set(node, id) {
        return super.set(node, id);
    }
    static get(node) {
        return super.get(node) || -1;
    }
    static has(node) {
        return super.has(node);
    }
}
exports.FlowIdReflector = FlowIdReflector;
//# sourceMappingURL=FlowIdReflector.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/cross-instance/SlotChildrenReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../../di/index");
class SlotChildrenReflector extends index_1.AbstractWeakMapReflector {
    static get REFLECTOR_NAME() {
        return 'SlotChildrenReflector';
    }
    ;
    static set(node, slotChildren) {
        return super.set(node, slotChildren);
    }
    static get(node) {
        return super.get(node) || [];
    }
    static has(node) {
        return super.has(node);
    }
}
exports.SlotChildrenReflector = SlotChildrenReflector;
//# sourceMappingURL=SlotChildrenReflector.js.map
});
___scope___.file("core/src/renderer/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/decorator/Renderer"), exports);
tslib_1.__exportStar(require("./src/interface/RendererConfig"), exports);
tslib_1.__exportStar(require("./src/enum/RendererImplType"), exports);
tslib_1.__exportStar(require("./src/context/renderer"), exports);
tslib_1.__exportStar(require("./src/function/injectScript"), exports);
tslib_1.__exportStar(require("./src/function/injectStyleSheet"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/renderer/src/decorator/Renderer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const renderer_1 = require("../context/renderer");
function Renderer(rendererConfig) {
    // called with @AppRenderer() or @AppRenderer({})
    if (!(typeof rendererConfig === 'function')) {
        return (target) => {
            renderer_1.setRenderer(rendererConfig);
            return target;
        };
    }
}
exports.Renderer = Renderer;
let DefaultRenderer = class DefaultRenderer {
};
DefaultRenderer = tslib_1.__decorate([
    Renderer({})
], DefaultRenderer);
//# sourceMappingURL=Renderer.js.map
});
___scope___.file("core/src/renderer/src/interface/RendererConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RendererConfig.js.map
});
___scope___.file("core/src/renderer/src/interface/RendererImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RendererImpl.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/Namespace.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Namespace.js.map
});
___scope___.file("core/src/renderer/src/impl/TSXToHTMLRendererImpl.js", function(exports, require, module){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const index_1 = require("../../../index");
const parseAttributeNS_1 = require("./tsx-to-html-renderer-impl/function/parseAttributeNS");
const collectNamespaceAttributes_1 = require("./tsx-to-html-renderer-impl/function/collectNamespaceAttributes");
const getInternalRenderApi_1 = require("../function/getInternalRenderApi");
const FlowIdReflector_1 = require("../../../webcomponent/src/reflector/cross-instance/FlowIdReflector");
const constants_1 = require("./tsx-to-html-renderer-impl/constants");
let TSXToHTMLRendererImpl = class TSXToHTMLRendererImpl {
    constructor(activeLogger) {
        this.activeLogger = activeLogger;
        /**
         * WebComponent observeAttributes observeAttributes heap cache.
         * Global cache. Used for intermediate value transmission.
         * Memory is freed directly after the atomic transmission
         * operation (DOM -> WebComponent JS instance) has ended.
         */
        this.attributeValueCache = {};
        /**
         * Constantly incremented sequence to address a certain attribute
         * observeAttributes in transmission between DOM and WebComponent JS instance.
         */
        this.attributeValueSequence = 0;
        /**
         * Original DOM/native createElement implementation reference.
         */
        this._createDOMElement = document.createElement.bind(document);
        this._createDOMElementNS = document.createElementNS.bind(document);
        this.generateUniqueAttributeValueId = () => {
            return 'attr-' + (++window.ActiveRenderer.attributeValueSequence);
        };
        this.appendChild = (child, element) => {
            let childToAppend = child;
            if (child instanceof Node) {
                childToAppend = child;
            }
            else if (typeof child == 'string' ||
                typeof child == 'number' ||
                typeof child == 'boolean') {
                childToAppend = document.createTextNode(child.toString());
            }
            if (childToAppend instanceof Node) {
                return element.appendChild(childToAppend);
            }
        };
        this.render = (virtualElementOrTagName, level = 0, namespaces = [], flowId = -1) => {
            let name = typeof virtualElementOrTagName === 'string' ? virtualElementOrTagName : virtualElementOrTagName.name;
            let attributes = virtualElementOrTagName.attributes || {};
            let children = virtualElementOrTagName.children || [];
            const nativeOptions = !!attributes.is ? { is: attributes.is } : undefined;
            delete attributes.is;
            const namespaceAttributes = collectNamespaceAttributes_1.collectNamespaceAttributes(attributes, namespaces);
            // 0. add all namespaces
            namespaces = namespaceAttributes.xmlNs;
            const element = this.createDOMElement(name, namespaces, nativeOptions);
            // ...and apply common flow process id (subtree re-flow identifier)
            FlowIdReflector_1.FlowIdReflector.set(element, flowId);
            // 1. add all bindings
            namespaceAttributes.injections.forEach((attribute) => {
                const scope = attribute.value;
                for (let injectionFieldName in scope) {
                    if (scope.hasOwnProperty(injectionFieldName)) {
                        const view = scope[injectionFieldName];
                        // setting the value of the st-inject
                        // (element instance) on the web component
                        // (injection target) with the name provided
                        // as object key name in st-inject
                        //
                        // for example: <p st-inject={{ paragraph1: view }}></p>
                        //
                        // view is an instance of SomeWebComponentInstance:
                        //
                        // class SomeWebComponentInstance {
                        //     constructor(protected paragraph1: HTMLParagraphElement) {
                        //         super();
                        //     }
                        //
                        //     onFlow(initial: boolean) {
                        //         console.log('');
                        //     }
                        // }
                        //
                        // We're setting view['paragraph1'] as the <p>-element instance reference here.
                        view[injectionFieldName] = element;
                    }
                }
            });
            // 2. add all events
            namespaceAttributes.event.forEach(([eventName, callback]) => {
                const eventListener = callback;
                //ElementEventListenersReflector.setEventListener(element, eventName, eventListener);
                element.addEventListener(eventName, eventListener);
            });
            // 3. reference JS objects to properties heap cache (to de-reference them later and fetch the JS object again)
            namespaceAttributes.property.forEach((attribute) => {
                const attributeValueId = this.generateUniqueAttributeValueId();
                this.attributeValueCache[attributeValueId] = attribute.value;
                this.setAttribute(element, {
                    name: attribute.name,
                    value: attributeValueId
                }, namespaces);
            });
            // 4. add html stuff
            namespaceAttributes.html.forEach((attribute) => {
                this.setAttribute(element, attribute, namespaces);
            });
            // 5. log error if attribute is not mappable
            namespaceAttributes.other.forEach((attribute) => {
                this.activeLogger.error(`Attribute(${attribute.name}) on element ${name} cannot be mapped.`, attribute.value);
            });
            children.filter(child => !(child == null || typeof child == 'undefined')).forEach((child) => {
                // child: string | number | boolean | Node | Array<Node>
                const append = (child) => {
                    const _append = (child, element) => {
                        const childType = typeof child;
                        if (childType == 'string' ||
                            childType == 'number' ||
                            childType == 'boolean' ||
                            child instanceof Node) {
                            this.appendChild(child, element);
                        }
                        else {
                            element.appendChild(this.render(child, level + 1, namespaces, flowId));
                        }
                    };
                    // <st-fragment> found in sub-tree
                    if (child.name === index_1.FRAGMENT_ELEMENT_TAG_NAME) {
                        // just don't render fragments, place their children one level up
                        if (child.children) {
                            child.children.forEach((childOfChild) => {
                                _append(childOfChild, element);
                            });
                        }
                    }
                    else {
                        _append(child, element);
                    }
                };
                if (child instanceof Array) {
                    child.filter(child => !(child == null || typeof child == 'undefined'))
                        .forEach(child => append(child));
                }
                else {
                    append(child);
                }
            });
            return element;
        };
        this.init();
    }
    cleanCaches() {
        this.attributeValueCache = {};
        this.attributeValueSequence = 0;
    }
    init() {
        // tsconfig.json tsx -> preserve
        // implement React TSX rendering API
        // (used globally by TypeScript compiler --jsx emitted code)
        window.ActiveRenderer = this;
        // assign at global scope for the native DOM functions to instantiate
        // WebComponents using this TSX renderer
        document.createElement = getInternalRenderApi_1.getInternalRenderApi().render.bind(getInternalRenderApi_1.getInternalRenderApi().createElement.bind((getInternalRenderApi_1.getInternalRenderApi())));
    }
    createNativeElement(virtualElementOrString, flowId) {
        return window.ActiveRenderer.render(virtualElementOrString, 0, [], flowId);
    }
    createNativeTextNode(data, flowId) {
        const textNode = document.createTextNode(data);
        FlowIdReflector_1.FlowIdReflector.set(textNode, flowId);
        return textNode;
    }
    createDOMElement(tagName, namespaces = [], nativeOptions) {
        const namespaceAttribute = parseAttributeNS_1.parseAttributeNS(tagName);
        const namespaceTagName = namespaceAttribute.name;
        if (namespaceAttribute.found) {
            const namespace = namespaces.find((ns) => namespaceAttribute.ns === ns.name);
            if (namespace) {
                return this._createDOMElementNS(namespace.value, namespaceTagName, nativeOptions);
            }
            this.activeLogger.error("No namespace found for attribute ", namespaceAttribute.ns, namespaceAttribute);
            return this._createDOMElementNS(null, namespaceTagName, nativeOptions);
        }
        const defaultNamespace = namespaces.find((ns) => constants_1.DEFAULT_NAMESPACE_NAME === ns.name);
        if (defaultNamespace) {
            return this._createDOMElementNS(defaultNamespace.value, namespaceTagName, nativeOptions);
        }
        else {
            return this._createDOMElement(namespaceTagName, nativeOptions);
        }
    }
    ;
    setAttribute(element, attribute, namespaces) {
        const namespaceAttribute = parseAttributeNS_1.parseAttributeNS(attribute.name);
        const attributeName = namespaceAttribute.name;
        if (namespaceAttribute.found || namespaces.length > 0) {
            const namespace = namespaces
                .find((ns) => namespaceAttribute.ns != undefined && namespaceAttribute.ns.startsWith(ns.name));
            if (namespace) {
                element.setAttributeNS(namespace.value, attributeName, attribute.value);
            }
            else {
                element.setAttributeNS(null, attributeName, attribute.value);
            }
        }
        else {
            element.setAttribute(attributeName, attribute.value);
        }
    }
    ;
    createElement(name, attributes, ...children) {
        return {
            name: name,
            attributes: attributes,
            children: children
        };
    }
    ;
};
TSXToHTMLRendererImpl = tslib_1.__decorate([
    index_1.Component,
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof index_1.ActiveLogger !== "undefined" && index_1.ActiveLogger) === "function" ? _a : Object])
], TSXToHTMLRendererImpl);
exports.TSXToHTMLRendererImpl = TSXToHTMLRendererImpl;
//# sourceMappingURL=TSXToHTMLRendererImpl.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/function/parseAttributeNS.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const lang_1 = require("../../../../../lang");
const NS_INDICATOR_ATTRIBUTES = [
    'xmlnsXlink',
    'xmlnsSvgjs',
    'xlinkHref',
    'xlinkActuate',
    'xlinkArcrole',
    'xlinkRole',
    'xlinkShow',
    'xlinkTitle',
    'xlinkType',
    'xmlBase',
    'xmlLang',
    'xmlSpace',
];
exports.parseAttributeNS = (name) => {
    if (!!name && NS_INDICATOR_ATTRIBUTES.indexOf(name) > -1) {
        const nsParts = lang_1.CaseTransformer.camelCaseToColonCase(name).split(constants_1.DEFAULT_NAMESPACE_DELIMITER)
            .filter(nsPart => !!nsPart);
        if (nsParts.length == 2) {
            return {
                found: true,
                name: nsParts[1],
                ns: nsParts[2]
            };
        }
    }
    return {
        found: false,
        name: name
    };
};
//# sourceMappingURL=parseAttributeNS.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/NamespaceAttributesMap.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=NamespaceAttributesMap.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/function/collectNamespaceAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const CaseTransformer_1 = require("../../../../../lang/src/string/CaseTransformer");
const parseAttributeNS_1 = require("./parseAttributeNS");
exports.collectNamespaceAttributes = (attributes, knownNamespaces) => {
    let collectedNamespaceAttributes = [];
    // 0. transform TSX attribute names (like: "className") back to standard attribute names ("class")
    const transformedAttributes = Object.entries(attributes)
        .map(([name, value]) => ({
        name,
        value
    }));
    // 0.1 collect all possible namespace attributes
    // order required
    // 1. filter all namespaces
    const rawXmlNs = transformedAttributes.filter((attribute) => attribute.name.indexOf(constants_1.DEFAULT_NAMESPACE_NAME) == 0);
    // 1.1 get namespace values
    const xmlNs = knownNamespaces.concat(rawXmlNs
        .map((attribute) => {
        if (parseAttributeNS_1.parseAttributeNS(attribute.name).found) {
            return {
                name: CaseTransformer_1.CaseTransformer.camelCaseToColonCase(attribute.name)
                    .split(constants_1.DEFAULT_NAMESPACE_DELIMITER).filter(s => !!s).pop() || '',
                value: attribute.value
            };
        }
        else {
            return {
                name: attribute.name.split(constants_1.DEFAULT_NAMESPACE_DELIMITER).filter(s => !!s).pop() || '',
                value: attribute.value
            };
        }
    })
        .filter((attrib) => !!attrib.name));
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(rawXmlNs);
    // 3. filter all DOM element injections
    const injections = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) => constants_1.DOM_ELEMENT_INJECT_ATTRIBUTE_NAME === attribute.name);
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(injections);
    // 4. filter all events
    let event = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) => attribute.name.startsWith('on') &&
        typeof attribute.value === 'function');
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(event);
    // 5. filter all properties
    const property = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) => typeof attribute.value !== 'string' &&
        typeof attribute.value !== 'number' &&
        typeof attribute.value !== 'boolean');
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(property);
    // 6. filter all html
    const html = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) => typeof attribute.value === 'string' ||
        typeof attribute.value === 'number' ||
        typeof attribute.value === 'boolean');
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(html);
    return {
        injections: injections,
        xmlNs: xmlNs,
        event: event.map((attribute) => ([
            attribute.name.substring(2, attribute.name.length).toLowerCase(), attribute.value
        ])),
        property: property,
        html: html,
        other: transformedAttributes.filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
    };
};
//# sourceMappingURL=collectNamespaceAttributes.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/Attribute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Attribute.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/RuntimeDOMAttributeCacheMap.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RuntimeDOMAttributeCacheMap.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/NamespaceAttribute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
//# sourceMappingURL=NamespaceAttribute.js.map
});
___scope___.file("core/src/renderer/src/function/getInternalRenderApi.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternalRenderApi = () => {
    return window.ActiveRenderer;
};
//# sourceMappingURL=getInternalRenderApi.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/constants.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_NAMESPACE_DELIMITER = ':';
exports.DEFAULT_NAMESPACE_NAME = 'xmlns';
exports.DOM_ELEMENT_INJECT_ATTRIBUTE_NAME = 'st-inject';
//# sourceMappingURL=constants.js.map
});
___scope___.file("core/src/renderer/src/enum/RendererImplType.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RendererImplType;
(function (RendererImplType) {
    RendererImplType["TSX"] = "TSX";
})(RendererImplType = exports.RendererImplType || (exports.RendererImplType = {}));
//# sourceMappingURL=RendererImplType.js.map
});
___scope___.file("core/src/renderer/src/context/renderer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const defaultRendererConfig_1 = require("../defaultRendererConfig");
const getRendererImplInstance_1 = require("../function/getRendererImplInstance");
const RENDERER = 'RENDERER';
exports.getRenderer = () => {
    let rendererImpl = di_1.ApplicationContext.getInstance().get(RENDERER);
    // @Renderer(...) not used in application
    if (!rendererImpl) {
        exports.setRenderer(defaultRendererConfig_1.defaultRendererConfig);
    }
    return di_1.ApplicationContext.getInstance().get(RENDERER);
};
exports.setRenderer = (appRendererConfig) => {
    di_1.ApplicationContext.getInstance().set(RENDERER, getRendererImplInstance_1.getRendererImplInstance(appRendererConfig));
};
exports.ActiveRenderer = exports.getRenderer();
//# sourceMappingURL=renderer.js.map
});
___scope___.file("core/src/renderer/src/defaultRendererConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RendererImplType_1 = require("./enum/RendererImplType");
exports.defaultRendererConfig = {
    type: RendererImplType_1.RendererImplType.TSX
};
//# sourceMappingURL=defaultRendererConfig.js.map
});
___scope___.file("core/src/renderer/src/function/getRendererImplInstance.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RendererImplType_1 = require("../enum/RendererImplType");
const TSXToHTMLRendererImpl_1 = require("../impl/TSXToHTMLRendererImpl");
const di_1 = require("../../../di");
exports.getRendererImplInstance = (rendererConfig) => {
    let rendererImpl;
    // custom impl provided via config
    if (rendererConfig.impl) {
        rendererImpl = rendererConfig.impl;
    }
    else {
        // using standard implementation
        switch (rendererConfig.type) {
            default:
            case RendererImplType_1.RendererImplType.TSX:
                rendererImpl = di_1.ApplicationContext.getInstance().getBean(TSXToHTMLRendererImpl_1.TSXToHTMLRendererImpl);
                break;
        }
    }
    return rendererImpl;
};
//# sourceMappingURL=getRendererImplInstance.js.map
});
___scope___.file("core/src/renderer/src/function/injectScript.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectScript = (src, name) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        // internet explorer
        if (script.readyState) {
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    resolve({ script: name, loaded: true, status: 'Loaded' });
                }
            };
        }
        else {
            script.onload = () => {
                resolve({ script: name, loaded: true, status: 'Loaded' });
            };
        }
        script.onerror = (error) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
    });
};
//# sourceMappingURL=injectScript.js.map
});
___scope___.file("core/src/renderer/src/function/injectStyleSheet.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectStyleSheet = (href, name) => {
    return new Promise((resolve) => {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = href;
        // internet explorer
        if (stylesheet.readyState) {
            stylesheet.onreadystatechange = () => {
                if (stylesheet.readyState === "loaded" || stylesheet.readyState === "complete") {
                    stylesheet.onreadystatechange = null;
                    resolve({ stylesheet: name, loaded: true, status: 'Loaded' });
                }
            };
        }
        else {
            stylesheet.onload = () => {
                resolve({ stylesheet: name, loaded: true, status: 'Loaded' });
            };
        }
        stylesheet.onerror = (error) => resolve({ stylesheet: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
    });
};
//# sourceMappingURL=injectStyleSheet.js.map
});
___scope___.file("core/src/tss/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/CSSDeclarationBlockGenerator"), exports);
tslib_1.__exportStar(require("./src/CSSInlineStyleGenerator"), exports);
tslib_1.__exportStar(require("./src/decorator/Theme"), exports);
tslib_1.__exportStar(require("./src/constant/HOST_SELECTOR"), exports);
tslib_1.__exportStar(require("./src/interface/StyleFunction"), exports);
tslib_1.__exportStar(require("./src/interface/TypedStyleSheet"), exports);
tslib_1.__exportStar(require("./src/interface/TemplateStringStyleSheet"), exports);
tslib_1.__exportStar(require("./src/context/theme"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/tss/src/CSSDeclarationBlockGenerator.jsx", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
const renderer_1 = require("../../renderer");
class CSSDeclarationBlockGenerator {
    static generate(declaration) {
        const generateDeclaration = (declaration, mediaQuery = false) => {
            let styles = '';
            // support for template-string based stylesheets
            if (typeof declaration === 'string') {
                return declaration;
            }
            for (let selector in declaration) {
                if (declaration.hasOwnProperty(selector)) {
                    if (selector.indexOf('@') === 0) {
                        styles = `${styles}\n\n${selector} {${generateDeclaration(declaration[selector], true)}    \n}\n\n`;
                    }
                    else {
                        let styleMapping = '';
                        for (let property in declaration[selector]) {
                            if (declaration[selector].hasOwnProperty(property)) {
                                if (typeof declaration[selector] === 'string') {
                                    // support for template-string based block styles
                                    styleMapping = declaration[selector];
                                }
                                else {
                                    let styleValue = declaration[selector][property];
                                    // uniform to array (multiple values for one CSS property)
                                    if (!Array.isArray(styleValue)) {
                                        styleValue = [styleValue];
                                    }
                                    for (let i = 0; i < styleValue.length; i++) {
                                        styleMapping = `${styleMapping}\n    ${mediaQuery ? '    ' : ''}${lang_1.CaseTransformer.camelToKebabCase(property) // selector
                                        }: ${styleValue[i]};`;
                                    }
                                }
                            }
                        }
                        styles = `${styles} \n\n${mediaQuery ? '    ' : ''}${selector} {\n${mediaQuery ? '        ' : '    '}${styleMapping}\n${mediaQuery ? '    ' : ''}}`;
                    }
                }
            }
            return styles;
        };
        return renderer_1.ActiveRenderer.createElement("style", { type: "text/css" }, generateDeclaration(declaration));
    }
}
exports.CSSDeclarationBlockGenerator = CSSDeclarationBlockGenerator;
//# sourceMappingURL=CSSDeclarationBlockGenerator.js.map
});
___scope___.file("core/src/tss/src/CSSInlineStyleGenerator.jsx", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HOST_SELECTOR_1 = require("./constant/HOST_SELECTOR");
const lang_1 = require("../../lang");
class CSSInlineStyleGenerator {
    static generateForStyleAttribute(declaration) {
        const inlineStyles = {};
        for (let selector in declaration) {
            if (selector === HOST_SELECTOR_1.HOST_SELECTOR) {
                // support for template-string based styling
                if (typeof declaration[selector] === 'string') {
                    return declaration[selector];
                }
                for (let identifier in declaration[selector]) {
                    inlineStyles[lang_1.CaseTransformer.camelToKebabCase(identifier)] = declaration[selector][identifier];
                }
            }
        }
        return inlineStyles;
    }
}
exports.CSSInlineStyleGenerator = CSSInlineStyleGenerator;
//# sourceMappingURL=CSSInlineStyleGenerator.js.map
});
___scope___.file("core/src/tss/src/decorator/Theme.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const theme_1 = require("../context/theme");
function Theme(theme) {
    // called with @Theme() or @Theme({ ... })
    if (!(typeof theme === 'function')) {
        return (target) => {
            theme_1.setTheme(target, theme);
            return target;
        };
    }
}
exports.Theme = Theme;
//# sourceMappingURL=Theme.js.map
});
___scope___.file("core/src/tss/src/constant/HOST_SELECTOR.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// see: https://developer.mozilla.org/en-US/docs/Web/CSS/:host()
exports.HOST_SELECTOR = ':host';
//# sourceMappingURL=HOST_SELECTOR.js.map
});
___scope___.file("core/src/tss/src/interface/StyleFunction.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=StyleFunction.js.map
});
___scope___.file("core/src/tss/src/interface/TypedStyleSheet.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TypedStyleSheet.js.map
});
___scope___.file("core/src/tss/src/interface/TypedCSSStyleDeclaration.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TypedCSSStyleDeclaration.js.map
});
___scope___.file("core/src/tss/src/interface/TemplateStringStyleSheet.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TemplateStringStyleSheet.js.map
});
___scope___.file("core/src/tss/src/context/theme.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const THEME = "THEME";
exports.setTheme = (prototype, theme) => {
    di_1.ApplicationContext.getInstance().set(THEME, theme);
};
exports.getTheme = () => di_1.ApplicationContext.getInstance().get(THEME);
//# sourceMappingURL=theme.js.map
});
___scope___.file("core/src/cd/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/decorator/Field"), exports);
tslib_1.__exportStar(require("./src/decorator/OnFieldChange"), exports);
tslib_1.__exportStar(require("./src/function/createChangeDetector"), exports);
tslib_1.__exportStar(require("./src/function/createFieldChangeDetector"), exports);
tslib_1.__exportStar(require("./src/decorator/Provide"), exports);
tslib_1.__exportStar(require("./src/decorator/Consume"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/cd/src/decorator/Field.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerForChangeDetection_1 = require("../function/registerForChangeDetection");
const fieldChangeCallbacks_1 = require("../reflector/fieldChangeCallbacks");
function Field(webComponentInstance, fieldName) {
    registerForChangeDetection_1.registerForChangeDetection(webComponentInstance.constructor, fieldName, false, (props, propName, value, instance) => {
        const onFieldChangeCallbacks = fieldChangeCallbacks_1.getOnFieldChangeCallbacks(webComponentInstance.constructor);
        onFieldChangeCallbacks.forEach((onFieldChangeCallbackRegistration) => {
            if (fieldName === onFieldChangeCallbackRegistration.fieldName) {
                instance[onFieldChangeCallbackRegistration.methodName](propName, value);
            }
        });
    });
}
exports.Field = Field;
//# sourceMappingURL=Field.js.map
});
___scope___.file("core/src/cd/src/function/registerForChangeDetection.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createFieldChangeDetector_1 = require("./createFieldChangeDetector");
const di_1 = require("../../../di");
exports.registerForChangeDetection = (prototype, fieldName, memorize, onChange = (instance, name, value) => { }, onBeforeChange = (instance, name, value) => true) => {
    di_1.ComponentReflector.addInitializer(prototype, (instance) => {
        createFieldChangeDetector_1.createFieldChangeDetector(instance, fieldName, memorize, onChange, onBeforeChange);
    });
};
//# sourceMappingURL=registerForChangeDetection.js.map
});
___scope___.file("core/src/cd/src/interface/ChangeDetectionInterceptor.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ChangeDetectionInterceptor.js.map
});
___scope___.file("core/src/cd/src/interface/FieldChangeCallbackRegistration.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=FieldChangeCallbackRegistration.js.map
});
___scope___.file("core/src/cd/src/reflector/fieldChangeCallbacks.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ON_FIELD_CHANGE_CALLBACKS = 'ON_FIELD_CHANGE_CALLBACKS';
exports.setOnFieldChangeCallbacks = (prototype, onFieldChangeCallbacks) => Reflect.set(prototype, ON_FIELD_CHANGE_CALLBACKS, onFieldChangeCallbacks);
exports.getOnFieldChangeCallbacks = (prototype) => Reflect.get(prototype, ON_FIELD_CHANGE_CALLBACKS) || [];
//# sourceMappingURL=fieldChangeCallbacks.js.map
});
___scope___.file("core/src/cd/src/decorator/OnFieldChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addFieldChangeCallback_1 = require("../function/addFieldChangeCallback");
function OnFieldChange(fieldName) {
    return (prototype, methodName) => {
        addFieldChangeCallback_1.addFieldChangeCallback(prototype, methodName, fieldName);
        return prototype;
    };
}
exports.OnFieldChange = OnFieldChange;
//# sourceMappingURL=OnFieldChange.js.map
});
___scope___.file("core/src/cd/src/function/addFieldChangeCallback.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fieldChangeCallbacks_1 = require("../reflector/fieldChangeCallbacks");
exports.addFieldChangeCallback = (prototype, methodName, fieldName) => {
    const onFieldChangeCallbacks = fieldChangeCallbacks_1.getOnFieldChangeCallbacks(prototype.constructor);
    onFieldChangeCallbacks.push({
        fieldName,
        methodName
    });
    fieldChangeCallbacks_1.setOnFieldChangeCallbacks(prototype.constructor, onFieldChangeCallbacks);
};
//# sourceMappingURL=addFieldChangeCallback.js.map
});
___scope___.file("core/src/cd/src/function/createChangeDetector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interceptableChange_1 = require("./interceptableChange");
const Comparator_1 = require("../../../lang/src/object/Comparator");
exports.createChangeDetector = (initialValue, memorize, onChange = (instance, name, value) => { }, onBeforeChange = (instance, name, value) => true, instance) => {
    return new Proxy(initialValue, {
        set: (props, name, value) => {
            if (memorize) {
                if (!Comparator_1.Comparator.isEqual(props[name], value)) {
                    interceptableChange_1.interceptableChange(props, name, value, onChange, onBeforeChange, instance);
                }
            }
            else {
                interceptableChange_1.interceptableChange(props, name, value, onChange, onBeforeChange, instance);
            }
            return true;
        },
        getPrototypeOf() {
            return {
                isChangeDetector: true
            };
        }
    });
};
//# sourceMappingURL=createChangeDetector.js.map
});
___scope___.file("core/src/cd/src/function/interceptableChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptableChange = (props, name, value, onChange, onBeforeChange, instance) => {
    const cancelled = !onBeforeChange(props, name, value, instance);
    if (!cancelled) {
        props[name] = value;
        onChange(props, name, value, instance);
    }
};
//# sourceMappingURL=interceptableChange.js.map
});
___scope___.file("core/src/cd/src/function/createFieldChangeDetector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createChangeDetector_1 = require("./createChangeDetector");
exports.createFieldChangeDetector = (instance, fieldName, memorize, onChange = (props, name, value) => { }, onBeforeChange = (props, name, value) => true) => {
    instance[fieldName] = createChangeDetector_1.createChangeDetector({
        ...instance[fieldName]
    }, memorize, onChange, onBeforeChange, instance);
    // make property immutable so it can't loose change detection
    // in case of instance[fieldName] = someThingElse but throws
    Object.defineProperty(instance, fieldName, {
        writable: false
    });
};
//# sourceMappingURL=createFieldChangeDetector.js.map
});
___scope___.file("core/src/cd/src/decorator/Provide.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getProvidedFieldConsumerListName_1 = require("../function/getProvidedFieldConsumerListName");
const addFieldChangeCallback_1 = require("../function/addFieldChangeCallback");
function Provide(webComponent, fieldName) {
    const providedFieldConsumerListName = getProvidedFieldConsumerListName_1.getProvidedFieldConsumerListName(fieldName.toString());
    const providedFieldChangeCallbackName = `$onProvidedField_${fieldName.toString()}_change`;
    if (!webComponent[providedFieldConsumerListName]) {
        webComponent[providedFieldConsumerListName] = [];
    }
    if (!webComponent[providedFieldChangeCallbackName]) {
        webComponent[providedFieldChangeCallbackName] = (propertyName, newValue) => {
            webComponent[providedFieldConsumerListName].forEach((notificationTarget) => {
                notificationTarget.instance[notificationTarget.fieldName][propertyName] = newValue;
            });
        };
        addFieldChangeCallback_1.addFieldChangeCallback(webComponent, providedFieldChangeCallbackName, fieldName.toString());
    }
}
exports.Provide = Provide;
//# sourceMappingURL=Provide.js.map
});
___scope___.file("core/src/cd/src/function/getProvidedFieldConsumerListName.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvidedFieldConsumerListName = (fieldName) => {
    return `$st_providedField_${fieldName}_consumerList`;
};
//# sourceMappingURL=getProvidedFieldConsumerListName.js.map
});
___scope___.file("core/src/cd/src/decorator/Consume.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const getProvidedFieldConsumerListName_1 = require("../function/getProvidedFieldConsumerListName");
function Consume(targetProviderWebComponent, fieldNameTarget) {
    return (webComponent, fieldName) => {
        const providedAttributeConsumerListName = getProvidedFieldConsumerListName_1.getProvidedFieldConsumerListName(fieldNameTarget.toString());
        if (!targetProviderWebComponent.prototype[providedAttributeConsumerListName]) {
            console.error(di_1.ComponentReflector.getName(targetProviderWebComponent), 'has no @Provide decorated field', fieldNameTarget, 'but it is @Consume by', webComponent.constructor.name, '->', fieldNameTarget);
        }
        di_1.ComponentReflector.addInitializer(webComponent.constructor, (instance) => {
            if (targetProviderWebComponent.prototype[providedAttributeConsumerListName]) {
                targetProviderWebComponent.prototype[providedAttributeConsumerListName].push({
                    instance,
                    fieldName
                });
            }
        });
    };
}
exports.Consume = Consume;
//# sourceMappingURL=Consume.js.map
});
___scope___.file("core/src/webcomponent/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/decorator/WebComponent"), exports);
tslib_1.__exportStar(require("./src/WebComponentReflector"), exports);
tslib_1.__exportStar(require("./src/component/ErrorMessage"), exports);
tslib_1.__exportStar(require("./src/interface/Lifecycle"), exports);
tslib_1.__exportStar(require("./src/enum/ShadowAttachMode"), exports);
tslib_1.__exportStar(require("./src/decorator/Use"), exports);
tslib_1.__exportStar(require("./src/decorator/Attribute"), exports);
tslib_1.__exportStar(require("./src/decorator/OnAttributeChange"), exports);
tslib_1.__exportStar(require("./src/decorator/Style"), exports);
tslib_1.__exportStar(require("./src/decorator/Template"), exports);
tslib_1.__exportStar(require("./src/interface/TemplateFunction"), exports);
tslib_1.__exportStar(require("./src/decorator/ShadowDOM"), exports);
tslib_1.__exportStar(require("./src/decorator/EventAttribute"), exports);
tslib_1.__exportStar(require("./src/function/DOMAttributeValueTransformers"), exports);
tslib_1.__exportStar(require("./src/enum/AttributeType"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/WebComponent.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import es5 adapter for backward-compatibility
const polyfillCustomElementsAPI_1 = require("../polyfill/polyfillCustomElementsAPI");
const decorateWebComponent_1 = require("../function/decorateWebComponent");
const logger_1 = require("../../../logger");
polyfillCustomElementsAPI_1.polyfillCustomElementsAPI();
function WebComponent(tagName) {
    return (webComponent) => {
        if (!tagName) {
            logger_1.error("The @WebComponent ", webComponent, " has no tag name! It should look like: @WebComponent('foo-bar-element')");
        }
        // must contain a kebab-dash
        if (tagName.indexOf('-') === -1) {
            logger_1.error("The @WebComponent ", webComponent, " tag name is not prefixed. It should look like: app-your-element-name, but it is: " + tagName);
        }
        return decorateWebComponent_1.decorateWebComponent(tagName, webComponent);
    };
}
exports.WebComponent = WebComponent;
//# sourceMappingURL=WebComponent.js.map
});
___scope___.file("core/src/webcomponent/src/polyfill/polyfillCustomElementsAPI.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 @license @nocompile
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
exports.polyfillCustomElementsAPI = function () {
    'use strict';
    (function () {
        if (void 0 === window.Reflect || void 0 === window.customElements || window.customElements.hasOwnProperty('polyfillWrapFlushCallback'))
            return;
        const a = HTMLElement;
        window.HTMLElement = function HTMLElement() {
            return Reflect.construct(a, [], this.constructor);
        }, HTMLElement.prototype = a.prototype, HTMLElement.prototype.constructor = HTMLElement, Object.setPrototypeOf(HTMLElement, a);
    })();
};
//# sourceMappingURL=polyfillCustomElementsAPI.js.map
});
___scope___.file("core/src/webcomponent/src/interface/WebComponentImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=WebComponentImpl.js.map
});
___scope___.file("core/src/webcomponent/src/function/decorateWebComponent.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const createWebComponentClass_1 = require("./createWebComponentClass");
const WebComponentReflector_1 = require("../WebComponentReflector");
const installInitialMutationObserver_1 = require("./installInitialMutationObserver");
exports.decorateWebComponent = (tagName, webComponent) => {
    // @Component by default
    const injectableWebComponent = di_1.Component(webComponent);
    const CustomWebComponent = createWebComponentClass_1.createWebComponentClass(tagName, injectableWebComponent);
    const registeredCustomWebComponent = window.customElements.get(tagName);
    if (!registeredCustomWebComponent) {
        // register custom element
        window.customElements.define(tagName, CustomWebComponent);
        WebComponentReflector_1.WebComponentReflector.setTagName(CustomWebComponent, tagName);
        WebComponentReflector_1.WebComponentReflector.registerByTagName(tagName, CustomWebComponent);
    }
    di_1.ComponentReflector.addInitializer(CustomWebComponent, (instance) => {
        installInitialMutationObserver_1.installInitialMutationObserver(instance, tagName);
    });
    return CustomWebComponent;
};
//# sourceMappingURL=decorateWebComponent.js.map
});
___scope___.file("core/src/webcomponent/src/function/createWebComponentClass.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtualdom_1 = require("../../../virtualdom");
const tss_1 = require("../../../tss");
const di_1 = require("../../../di");
const getAttributeReferencedValue_1 = require("./getAttributeReferencedValue");
const getAttributeEventListenerValue_1 = require("./getAttributeEventListenerValue");
const observedAttributes_1 = require("../reflector/protoype/observedAttributes");
const shadow_1 = require("../reflector/protoype/shadow");
const shadowRoot_1 = require("../reflector/instance/shadowRoot");
const style_1 = require("../reflector/protoype/style");
const template_1 = require("../reflector/protoype/template");
const VirtualDOMMutator_1 = require("../../../virtualdom/src/mutation/VirtualDOMMutator");
const VIRTUAL_DOM = 'VIRTUAL_DOM';
exports.createWebComponentClass = (tagName, injectableWebComponent) => {
    // custom web component extends user implemented web component class
    // which extends HTMLElement
    const CustomWebComponent = class extends injectableWebComponent {
        constructor(...args) {
            super();
            // call all registered initializer functions for this WebComponent as BeanFactory is not
            // creating instances of WebComponents but document.createElement. Thus, we need to do it here.
            di_1.ComponentReflector.callInitializers(di_1.ComponentReflector.getInitializers(CustomWebComponent), this);
        }
        static get observedAttributes() {
            return observedAttributes_1.getObservedAttributes(CustomWebComponent);
        }
        shouldAttributeChange(name, oldValue, newValue) {
            return true;
        }
        changeAttribute(name, newValue) {
            this[name] = newValue;
        }
        render() {
            let cancelled = false;
            const elements = [];
            if (super.onBeforeRender) {
                cancelled = super.onBeforeRender();
            }
            if (!cancelled) {
                const style = style_1.getStyleForComponent(CustomWebComponent);
                // generate and inject styles
                if (style) {
                    const contextTheme = tss_1.getTheme();
                    const theme = {
                        ...contextTheme ? contextTheme : {}
                    };
                    virtualdom_1.transformToFlatElementList(elements, tss_1.CSSDeclarationBlockGenerator.generate(style(this, theme)));
                    // support for :component selector (self-referenced component styles) works even in shadow DOM
                    const componentInlineStyle = tss_1.CSSInlineStyleGenerator.generateForStyleAttribute(style(this, theme));
                    const allStyles = {};
                    for (let styleAttributeName in componentInlineStyle) {
                        if (componentInlineStyle.hasOwnProperty(styleAttributeName)) {
                            // cannot set directly, because browsers removed the setter / DOM API change
                            allStyles[styleAttributeName] = componentInlineStyle[styleAttributeName];
                        }
                    }
                    // @ts-ignore
                    this.style = allStyles;
                }
                if (super.render) {
                    virtualdom_1.transformToFlatElementList(elements, super.render());
                }
                else {
                    const template = template_1.getTemplateForComponent(CustomWebComponent);
                    if (typeof template === 'function') {
                        virtualdom_1.transformToFlatElementList(elements, template(this));
                    }
                }
                if (super.onAfterRender) {
                    super.onAfterRender(elements);
                }
            }
            return elements;
        }
        doFlow() {
            const virtualElements = this.render();
            if (virtualElements) {
                const root = shadow_1.getShadowForComponent(CustomWebComponent) ?
                    shadowRoot_1.getShadowRootForComponent(this) :
                    this;
                const virtualElementRoot = virtualdom_1.VirtualDOMTransformer.transformVirtualElementTree({
                    name: tagName,
                    children: virtualElements
                });
                Reflect.set(this, VIRTUAL_DOM, virtualElementRoot);
                VirtualDOMMutator_1.VirtualDOMMutator.mutateElementTree(root.childNodes, virtualElementRoot && typeof virtualElementRoot === 'object' ?
                    virtualElementRoot.children : [], root, performance.now());
            }
        }
        async flow(initial = false) {
            let cancelled = false;
            if (super.onBeforeFlow) {
                cancelled = super.onBeforeFlow(initial);
            }
            if (!cancelled && this.isConnected) {
                this.doFlow();
                if (super.onFlow) {
                    super.onFlow(initial);
                }
            }
        }
        shouldFlowOnAttributeChange(attributeName, oldValue, newValue) {
            return true;
        }
        flowOnAttributeChange(attributeName, oldValue, newValue) {
            if (this.shouldFlowOnAttributeChange(attributeName, oldValue, newValue)) {
                this.flow();
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            let cancelled = false;
            const attributeValue = getAttributeEventListenerValue_1.getAttributeEventListenerValue(CustomWebComponent, name, newValue, this) ||
                getAttributeReferencedValue_1.getAttributeReferencedValue(newValue);
            if (super.onBeforeAttributeChange) {
                cancelled = super.onBeforeAttributeChange(name, oldValue, attributeValue);
            }
            if (!cancelled && this.shouldAttributeChange(name, oldValue, newValue)) {
                this.changeAttribute(name, attributeValue);
                if (super.onAttributeChanged) {
                    return super.onAttributeChanged(name, oldValue, attributeValue);
                }
            }
        }
        doConnect() {
            // delay initial flow so that MutationObserver for initial
            // DOM changes is called first (it's a DOM impl. timing/lifecycle glitch)
            setTimeout(() => {
                this.flow(true);
            }, 1 /* ms delay */);
        }
        connectedCallback() {
            let cancelled = false;
            if (super.onBeforeConnect) {
                cancelled = super.onBeforeConnect();
            }
            if (!cancelled) {
                this.doConnect();
                if (super.onConnect) {
                    super.onConnect();
                }
            }
        }
    };
    return CustomWebComponent;
};
//# sourceMappingURL=createWebComponentClass.js.map
});
___scope___.file("core/src/webcomponent/src/function/getAttributeReferencedValue.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getInternalRenderApi_1 = require("../../../renderer/src/function/getInternalRenderApi");
exports.getAttributeReferencedValue = (attributeValueIdOrValue) => {
    // de-reference attribute value
    const attributeValue = getInternalRenderApi_1.getInternalRenderApi().attributeValueCache[attributeValueIdOrValue];
    delete getInternalRenderApi_1.getInternalRenderApi().attributeValueCache[attributeValueIdOrValue];
    return attributeValue || attributeValueIdOrValue;
};
//# sourceMappingURL=getAttributeReferencedValue.js.map
});
___scope___.file("core/src/webcomponent/src/function/getAttributeEventListenerValue.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../../logger");
const eventAttributes_1 = require("../reflector/protoype/eventAttributes");
exports.getAttributeEventListenerValue = (prototype, attributeName, attributeValueIdOrValue, scope) => {
    const eventAttributes = eventAttributes_1.getEventAttributes(prototype);
    if (eventAttributes.indexOf(attributeName) !== -1) {
        if (typeof attributeValueIdOrValue == 'function') {
            return attributeValueIdOrValue.bind(scope);
        }
        else if (typeof attributeValueIdOrValue == 'string') {
            return function () {
                return attributeValueIdOrValue;
            }.bind(scope);
        }
        else {
            return function () {
                logger_1.error('Event listener set for ' + attributeName + ' is neither code nor function.');
            }.bind(scope);
        }
    }
    return null;
};
//# sourceMappingURL=getAttributeEventListenerValue.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/eventAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EVENT_ATTRIBUTES = 'EVENT_ATTRIBUTES';
exports.getEventAttributes = (prototype) => Reflect.get(prototype, EVENT_ATTRIBUTES) || [];
exports.setEventAttributes = (prototype, eventAttributes) => Reflect.set(prototype, EVENT_ATTRIBUTES, eventAttributes) || [];
//# sourceMappingURL=eventAttributes.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/observedAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OBSERVED_ATTRIBUTES = 'OBSERVED_ATTRIBUTES';
exports.setObservedAttributes = (prototype, observedAttributes) => Reflect.set(prototype, OBSERVED_ATTRIBUTES, observedAttributes) || [];
exports.getObservedAttributes = (prototype) => Reflect.get(prototype, OBSERVED_ATTRIBUTES) || [];
//# sourceMappingURL=observedAttributes.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/shadow.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SHADOW = 'SHADOW';
const SHADOW_ATTACH_MODE = 'SHADOW_ATTACH_MODE';
exports.getShadowAttachModeForComponent = (webComponent) => {
    return Reflect.get(webComponent, SHADOW_ATTACH_MODE);
};
exports.getShadowForComponent = (webComponent) => {
    return Reflect.get(webComponent, SHADOW);
};
exports.setShadowForComponent = (webComponent, hasShadowDOM) => {
    return Reflect.set(webComponent, SHADOW, hasShadowDOM);
};
exports.setShadowAttachModeForComponent = (webComponent, shadowAttachMode) => {
    return Reflect.set(webComponent, SHADOW_ATTACH_MODE, shadowAttachMode);
};
//# sourceMappingURL=shadow.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/instance/shadowRoot.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHADOW_ROOT = 'SHADOW_ROOT';
exports.getShadowRootForComponent = (webComponent) => {
    return Reflect.get(webComponent, exports.SHADOW_ROOT);
};
exports.setShadowRootForComponent = (webComponent, shadowRoot) => {
    return Reflect.set(webComponent, exports.SHADOW_ROOT, shadowRoot);
};
//# sourceMappingURL=shadowRoot.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/style.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const STYLE = 'STYLE';
exports.getStyleForComponent = (webComponent) => {
    return Reflect.get(webComponent, STYLE);
};
exports.setStyleForComponent = (webComponent, style) => {
    Reflect.set(webComponent, STYLE, style);
};
//# sourceMappingURL=style.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/template.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TEMPLATE = 'TEMPLATE';
exports.getTemplateForComponent = (webComponent) => {
    return Reflect.get(webComponent, TEMPLATE);
};
exports.setTemplateForComponent = (webComponent, template) => {
    Reflect.set(webComponent, TEMPLATE, template);
};
//# sourceMappingURL=template.js.map
});
___scope___.file("core/src/webcomponent/src/function/installInitialMutationObserver.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtualdom_1 = require("../../../virtualdom");
const FlowIdReflector_1 = require("../reflector/cross-instance/FlowIdReflector");
const isWebComponent_1 = require("./isWebComponent");
exports.installInitialMutationObserver = (instance, tagName) => {
    // initial DOM children processing -> transform <web-component>$childNodes</web-component>
    // into an Array<VirtualElement> to be further transformed and re-rendered
    const observer = new MutationObserver((mutationsList) => {
        const webComponentNode = instance;
        let initialChildren = [];
        const addedNodes = mutationsList
            .filter(mutation => mutation.type === 'childList')
            .filter(mutation => mutation.addedNodes && mutation.addedNodes.length)
            .map(mutation => mutation.addedNodes);
        addedNodes.forEach((mutationNodeList) => {
            initialChildren = [...initialChildren, ...mutationNodeList];
            // prevent mutation from firing re-flows by self-change
            initialChildren = initialChildren.filter((child) => !FlowIdReflector_1.FlowIdReflector.has(child) && child.tagName && !isWebComponent_1.isWebComponent(child.tagName));
        });
        // ECMAScript spec. whitespace-only check
        // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM
        initialChildren = initialChildren.filter(node => (/[^\t\n\r ]/.test(node.textContent || '')));
        // must be a direct child of this component
        initialChildren = initialChildren.filter(node => node.parentNode === webComponentNode);
        if (initialChildren && initialChildren.length > 0) {
            virtualdom_1.VirtualDOMMutator.cacheSlotChildren({
                name: tagName,
                children: initialChildren.map(element => virtualdom_1.transformElementToVirtualElement(element))
            }, instance);
            // evict all children
            instance.innerHTML = '';
            // queue re-flows
            instance.flow(!instance.isConnected);
        }
        observer.disconnect();
    });
    observer.observe(instance, { childList: true });
};
//# sourceMappingURL=installInitialMutationObserver.js.map
});
___scope___.file("core/src/webcomponent/src/component/ErrorMessage.jsx", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const WebComponent_1 = require("../decorator/WebComponent");
const Attribute_1 = require("../decorator/Attribute");
const Style_1 = require("../decorator/Style");
const renderer_1 = require("../../../renderer");
let ErrorMessage = class ErrorMessage extends HTMLElement {
    constructor() {
        super(...arguments);
        this.message = "Unknown error.";
    }
    render() {
        return renderer_1.ActiveRenderer.createElement("p", null, this.message);
    }
};
tslib_1.__decorate([
    Attribute_1.Attribute,
    tslib_1.__metadata("design:type", String)
], ErrorMessage.prototype, "message", void 0);
ErrorMessage = tslib_1.__decorate([
    WebComponent_1.WebComponent('st-error-message'),
    Style_1.Style((view) => ({
        'p': {
            color: '#ff0000'
        }
    }))
], ErrorMessage);
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map
});
___scope___.file("core/src/webcomponent/src/interface/Lifecycle.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Lifecycle.js.map
});
___scope___.file("core/src/webcomponent/src/enum/ShadowAttachMode.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShadowAttachMode;
(function (ShadowAttachMode) {
    ShadowAttachMode["OPEN"] = "open";
    ShadowAttachMode["CLOSED"] = "closed";
})(ShadowAttachMode = exports.ShadowAttachMode || (exports.ShadowAttachMode = {}));
//# sourceMappingURL=ShadowAttachMode.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/Use.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Use(component, ...moreComponents) {
    return (targetWebComponent) => {
        return targetWebComponent;
    };
}
exports.Use = Use;
//# sourceMappingURL=Use.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/Attribute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const decorateTransparentAttributeGetterAndSetter_1 = require("../function/decorateTransparentAttributeGetterAndSetter");
const logger_1 = require("../../../logger");
const observedAttributes_1 = require("../reflector/protoype/observedAttributes");
const attributes_1 = require("../reflector/instance/attributes");
const __1 = require("../..");
exports.ATTRIBUTE_TRANSFORM_FN_NAME = 'ATTR_TRANSFORM_FN';
function Attribute(webComponentInstanceOrTransformFnOrAttributeType, attributeName) {
    const setup = (webComponentInstance, attributeName, webComponentInstanceOrTransformFnOrAttributeType) => {
        let transformFn;
        // test for uppercase characters
        if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName.toString())) {
            logger_1.warn('The @WebComponent', webComponentInstance.constructor, ' has an @Attribute with camelCase naming: ', attributeName, '. Use kebab-case instead!');
        }
        if (typeof webComponentInstanceOrTransformFnOrAttributeType === 'string') {
            switch (webComponentInstanceOrTransformFnOrAttributeType) {
                case __1.AttributeType.BOOLEAN:
                    transformFn = __1.transformBooleanDOMAttributeValue;
                    break;
                case __1.AttributeType.FLOAT:
                    transformFn = __1.transformFloatDOMAttributeValue;
                    break;
                case __1.AttributeType.INT:
                    transformFn = __1.transformIntDOMAttributeValue;
                    break;
            }
        }
        else if (typeof webComponentInstanceOrTransformFnOrAttributeType === 'function') {
            transformFn = webComponentInstanceOrTransformFnOrAttributeType;
        }
        else if (typeof webComponentInstanceOrTransformFnOrAttributeType !== 'undefined') {
            logger_1.warn('The @WebComponent', webComponentInstance.constructor, ' has an @Attribute(attributeTypeOrTransformFn) with an invalid AttributeType / no transform function: ', attributeName, ' value cannot be transformed by: ', webComponentInstanceOrTransformFnOrAttributeType);
        }
        const observedAttributes = observedAttributes_1.getObservedAttributes(webComponentInstance.constructor);
        observedAttributes.push(attributeName);
        if (transformFn) {
            Reflect.set(webComponentInstance, exports.ATTRIBUTE_TRANSFORM_FN_NAME + attributeName.toString(), transformFn);
        }
        observedAttributes_1.setObservedAttributes(webComponentInstance.constructor, observedAttributes);
        di_1.ComponentReflector.addInitializer(webComponentInstance.constructor, (instance) => {
            attributes_1.initializeAttributes(instance, webComponentInstance.constructor, observedAttributes);
            decorateTransparentAttributeGetterAndSetter_1.decorateTransparentAttributeGetterAndSetter(instance, webComponentInstance.constructor, observedAttributes);
            attributes_1.registerAttributeHooks(instance, observedAttributes);
        });
    };
    if (webComponentInstanceOrTransformFnOrAttributeType instanceof HTMLElement) {
        setup(webComponentInstanceOrTransformFnOrAttributeType, attributeName);
    }
    else {
        return (webComponentInstance, attributeName) => {
            setup(webComponentInstance, attributeName, webComponentInstanceOrTransformFnOrAttributeType);
        };
    }
}
exports.Attribute = Attribute;
//# sourceMappingURL=Attribute.js.map
});
___scope___.file("core/src/webcomponent/src/function/decorateTransparentAttributeGetterAndSetter.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributes_1 = require("../reflector/instance/attributes");
const __1 = require("../..");
const ATTRIBUTE_REGISTERED = "ATTRIBUTE_REGISTERED_";
exports.decorateTransparentAttributeGetterAndSetter = (instance, prototype, observedAttributes) => {
    observedAttributes.forEach((attributeName) => {
        if (!Reflect.get(instance, (ATTRIBUTE_REGISTERED + attributeName))) {
            const transformFn = Reflect.get(instance, __1.ATTRIBUTE_TRANSFORM_FN_NAME + attributeName.toString());
            Object.defineProperty(instance, attributeName, {
                // call: $webComponent.$attribute = x
                set: (newValue) => {
                    newValue = transformFn ? transformFn(newValue) : newValue;
                    const oldValue = instance[attributeName];
                    let changeCancelled = false;
                    if (instance.onBeforeAttributeChange) {
                        changeCancelled = instance.onBeforeAttributeChange(attributeName, oldValue, newValue);
                    }
                    if (!changeCancelled) {
                        attributes_1.setAttribute(instance, attributeName, newValue);
                        attributes_1.executeOnAttributeChangeCallbacks(prototype, instance, attributeName);
                        instance.flowOnAttributeChange(attributeName, oldValue, newValue);
                    }
                    return true;
                },
                // call: let y = $webComponent.$attribute
                get: () => attributes_1.getAttribute(instance, attributeName),
            });
            Reflect.set(instance, (ATTRIBUTE_REGISTERED + attributeName), true);
        }
    });
};
//# sourceMappingURL=decorateTransparentAttributeGetterAndSetter.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/instance/attributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributeChangeCallbacks_1 = require("../protoype/attributeChangeCallbacks");
const __1 = require("../../..");
const ATTRIBUTE_DEFAULT_INITIALIZED = 'ATTRIBUTE_DEFAULT_INITIALIZED';
const ATTRIBUTE_VALUE = "ATTRIBUTE_VALUE_";
const ATTRIBUTE_HOOK_REGISTERED = 'TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED';
// Web Standard API naming, do NOT change
const GET_ATTRIBUTE_METHOD_NAME = 'getAttribute';
const ATTRIBUTES_GETTER_NAME = 'attributes';
exports.getAttribute = (instance, attributeName) => Reflect.get(instance, (ATTRIBUTE_VALUE + attributeName));
exports.setAttribute = (instance, attributeName, value) => {
    Reflect.set(instance, (ATTRIBUTE_VALUE + attributeName), value);
};
exports.initializeAttributes = (instance, prototype, observedAttributes) => {
    // set default attribute values (initial)
    observedAttributes.forEach((attributeName) => {
        if (!Reflect.get(instance, (ATTRIBUTE_DEFAULT_INITIALIZED + attributeName))) {
            const transformFn = Reflect.get(instance, __1.ATTRIBUTE_TRANSFORM_FN_NAME + attributeName.toString());
            exports.setAttribute(instance, attributeName, transformFn ? transformFn(instance[attributeName]) : instance[attributeName]);
            exports.executeOnAttributeChangeCallbacks(prototype, instance, attributeName);
            Reflect.set(instance, (ATTRIBUTE_DEFAULT_INITIALIZED + attributeName), true);
        }
    });
};
exports.executeOnAttributeChangeCallbacks = (prototype, instance, attributeName) => {
    const attributeChangeCallbacks = attributeChangeCallbacks_1.getAttributeChangeCallbacks(prototype);
    attributeChangeCallbacks.forEach((attributeChangeCallbackRegistration) => {
        if (attributeChangeCallbackRegistration.attributeName === attributeName) {
            instance[attributeChangeCallbackRegistration.methodName]();
        }
    });
};
exports.registerAttributeHooks = (instance, observedAttributes) => {
    // if transparent hooks are not yet registered for this @Attribute...
    if (!Reflect.get(instance, (ATTRIBUTE_HOOK_REGISTERED))) {
        // $webComponent.getAttribute(...) [native]
        const originalGetAttribute = instance[GET_ATTRIBUTE_METHOD_NAME].bind(instance);
        // replace $webComponent.getAttribute(...)
        instance[GET_ATTRIBUTE_METHOD_NAME] = (attributeName) => {
            // if attribute is not @Attribute observed, call native
            // $webComponent.getAttribute(...)
            if (observedAttributes.indexOf(attributeName) === -1) {
                return originalGetAttribute(attributeName);
            }
            // else return transparent value
            return exports.getAttribute(instance, attributeName);
        };
        // $webComponent.attributes [native]
        const originalAttributes = instance[ATTRIBUTES_GETTER_NAME];
        // replace $webComponent.attributes
        Object.defineProperty(instance, ATTRIBUTES_GETTER_NAME, {
            get: () => {
                // get all native $webComponent.attributes
                const attributes = originalAttributes;
                // enrich them with @Attribute added attributes
                observedAttributes.forEach((observedAttributeName) => {
                    attributes[observedAttributeName] = instance[observedAttributeName];
                });
                return attributes;
            }
        });
        Reflect.set(instance, (ATTRIBUTE_HOOK_REGISTERED), true);
    }
};
//# sourceMappingURL=attributes.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/attributeChangeCallbacks.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ATTRIBUTE_CHANGE_CALLBACKS = 'ATTRIBUTE_CHANGE_CALLBACKS';
exports.getAttributeChangeCallbacks = (prototype) => Reflect.get(prototype, ATTRIBUTE_CHANGE_CALLBACKS) || [];
exports.setAttributeChangeCallbacks = (prototype, attributeChangeCallbacks) => Reflect.set(prototype, ATTRIBUTE_CHANGE_CALLBACKS, attributeChangeCallbacks) || [];
//# sourceMappingURL=attributeChangeCallbacks.js.map
});
___scope___.file("core/src/webcomponent/src/interface/AttributeChangeCallbackRegistration.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=AttributeChangeCallbackRegistration.js.map
});
___scope___.file("core/src/webcomponent/src/interface/DOMAttributeValueTransformer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=DOMAttributeValueTransformer.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/OnAttributeChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributeChangeCallbacks_1 = require("../reflector/protoype/attributeChangeCallbacks");
function OnAttributeChange(attributeName) {
    return (prototype, methodName) => {
        const attributeChangeCallbacks = attributeChangeCallbacks_1.getAttributeChangeCallbacks(prototype.constructor);
        attributeChangeCallbacks.push({
            methodName,
            attributeName
        });
        attributeChangeCallbacks_1.setAttributeChangeCallbacks(prototype.constructor, attributeChangeCallbacks);
        return prototype;
    };
}
exports.OnAttributeChange = OnAttributeChange;
//# sourceMappingURL=OnAttributeChange.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/Style.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const style_1 = require("../reflector/protoype/style");
function Style(style) {
    return (targetWebComponent) => {
        style_1.setStyleForComponent(targetWebComponent, style);
        return targetWebComponent;
    };
}
exports.Style = Style;
//# sourceMappingURL=Style.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/Template.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../reflector/protoype/template");
function Template(template) {
    return (targetWebComponent) => {
        template_1.setTemplateForComponent(targetWebComponent, template);
        return targetWebComponent;
    };
}
exports.Template = Template;
//# sourceMappingURL=Template.js.map
});
___scope___.file("core/src/webcomponent/src/interface/TemplateFunction.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TemplateFunction.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/ShadowDOM.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorateShadowAndAttachModeForComponent_1 = require("../function/decorateShadowAndAttachModeForComponent");
function ShadowDOM(shadowAttachModeOrComponent) {
    if (typeof shadowAttachModeOrComponent === 'function') {
        decorateShadowAndAttachModeForComponent_1.decorateShadowAndAttachModeForComponent(shadowAttachModeOrComponent);
    }
    else {
        return (targetWebComponent) => {
            decorateShadowAndAttachModeForComponent_1.decorateShadowAndAttachModeForComponent(targetWebComponent, shadowAttachModeOrComponent);
            return targetWebComponent;
        };
    }
}
exports.ShadowDOM = ShadowDOM;
//# sourceMappingURL=ShadowDOM.js.map
});
___scope___.file("core/src/webcomponent/src/function/decorateShadowAndAttachModeForComponent.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const di_1 = require("../../../di");
const shadow_1 = require("../reflector/protoype/shadow");
const shadowRoot_1 = require("../reflector/instance/shadowRoot");
exports.decorateShadowAndAttachModeForComponent = (webComponent, shadowAttachMode) => {
    shadow_1.setShadowForComponent(webComponent, true);
    if (shadowAttachMode) {
        shadow_1.setShadowAttachModeForComponent(webComponent, shadowAttachMode);
    }
    di_1.ComponentReflector.addInitializer(webComponent, (instance) => {
        const shadow = shadow_1.getShadowForComponent(webComponent);
        if (shadow) {
            const shadowAttachMode = shadow_1.getShadowAttachModeForComponent(webComponent);
            const shadowRoot = instance.attachShadow({
                mode: shadowAttachMode ? shadowAttachMode : index_1.ShadowAttachMode.OPEN
            });
            shadowRoot_1.setShadowRootForComponent(instance, shadowRoot);
        }
    });
};
//# sourceMappingURL=decorateShadowAndAttachModeForComponent.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/EventAttribute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Attribute_1 = require("./Attribute");
const eventAttributes_1 = require("../reflector/protoype/eventAttributes");
function EventAttribute(webComponentInstance, attributeName) {
    // an event is an attribute with added annotation to transform string functions
    // into evaluated functions (in case of plain HTML use, integration)
    Attribute_1.Attribute(webComponentInstance, attributeName);
    const eventAttributes = eventAttributes_1.getEventAttributes(webComponentInstance.constructor);
    eventAttributes.push(attributeName);
    eventAttributes_1.setEventAttributes(webComponentInstance.constructor, eventAttributes);
}
exports.EventAttribute = EventAttribute;
//# sourceMappingURL=EventAttribute.js.map
});
___scope___.file("core/src/webcomponent/src/function/DOMAttributeValueTransformers.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformBooleanDOMAttributeValue = (value) => {
    if (typeof value === 'boolean') {
        return value;
    }
    else {
        //check if variable is false
        if (value === 'false') {
            return false;
        }
        // i.e.: "disabled" on an HTML element ends in an empty string which should
        // be transformed to: true. Likewise disabled="disabled" should end up as true whereas
        // no presence at all should result in false.
        return typeof value !== 'undefined';
    }
};
exports.transformFloatDOMAttributeValue = (value) => parseFloat(value.toString());
exports.transformIntDOMAttributeValue = (value) => parseInt(value.toString());
//# sourceMappingURL=DOMAttributeValueTransformers.js.map
});
___scope___.file("core/src/webcomponent/src/enum/AttributeType.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttributeType;
(function (AttributeType) {
    AttributeType["STRING"] = "STRING";
    AttributeType["INT"] = "INT";
    AttributeType["FLOAT"] = "FLOAT";
    AttributeType["BOOLEAN"] = "BOOLEAN";
})(AttributeType = exports.AttributeType || (exports.AttributeType = {}));
//# sourceMappingURL=AttributeType.js.map
});
___scope___.file("integration-todo/src/translation-config.js", function(exports, require, module){
var buffer = require("buffer").Buffer;
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const i18n_1 = require("~/i18n/src/index.js");
const core_1 = require("~/core/src/index.js");
const date_fns_1 = require("date-fns");
const englishTranslations = tslib_1.__importStar(require("./translation/en.json"));
const germanTranslations = tslib_1.__importStar(require("./translation/de.json"));
const dateFnsLocales = {
    en: require("date-fns/locale/en/index.js"),
    de: require("date-fns/locale/de/index.js")
};
let localeId = 'de';
exports.dateFormat = (date, dateFormat) => {
    return date_fns_1.format(date, dateFormat, {
        locale: dateFnsLocales[localeId]
    });
};
let AppTranslationConfig = class AppTranslationConfig {
    constructor(translator) {
        this.translator = translator;
        // this method is called 4 times by the framework internally.
        // this is because of language detection and expected behaviour,
        // but we want to aggregate those calls and listen to only the
        // last one in a time-frame of 10ms. Thus, we buffer the event listener:
        const onLanguageChange = core_1.buffer((language) => {
            // keep translations in sync: when language changes, tell date-fns to change accordingly
            localeId = language;
            console.log('on lang change');
        }, 10 /* ms */);
        translator.onLanguageChanged(onLanguageChange);
    }
};
AppTranslationConfig = tslib_1.__decorate([
    i18n_1.Translations('en', englishTranslations),
    i18n_1.Translations('de', germanTranslations),
    i18n_1.TranslationFormat('uppercase', (value) => (value || '').toUpperCase()),
    i18n_1.TranslationFormat('DD-MM-YYYY_HH:mm:ss', (value) => exports.dateFormat(value, 'dddd, DD-MM-YYYY HH:mm:ss')),
    core_1.Component,
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof i18n_1.Translator !== "undefined" && i18n_1.Translator) === "function" ? _a : Object])
], AppTranslationConfig);
exports.AppTranslationConfig = AppTranslationConfig;
//# sourceMappingURL=translation-config.js.map
});
___scope___.file("i18n/src/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./i18nextAdaper"), exports);
tslib_1.__exportStar(require("./component/Translate"), exports);
tslib_1.__exportStar(require("./interface/LanguageDetectorOptions"), exports);
tslib_1.__exportStar(require("./decorator/Translation"), exports);
tslib_1.__exportStar(require("./decorator/Translations"), exports);
tslib_1.__exportStar(require("./interface/TranslationCatalog"), exports);
tslib_1.__exportStar(require("./Translator"), exports);
tslib_1.__exportStar(require("./decorator/TranslationFormat"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("i18n/src/i18nextAdaper.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
exports.i18n = i18next_1.default;
const translate = i18next_1.default.t.bind(i18next_1.default);
exports.t = (key, options) => {
    return translate(key, options);
};
//# sourceMappingURL=i18nextAdaper.js.map
});
___scope___.file("i18n/src/component/Translate.jsx", function(exports, require, module){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const i18nextAdaper_1 = require("../i18nextAdaper");
const i18next_1 = require("i18next");
let Translate = class Translate extends HTMLElement {
    onBeforeRender() {
        if (!this.cachedTranslation) {
            this.cachedTranslation = i18nextAdaper_1.t(this.key, { ...this.values || {}, ...this.options || {} });
        }
    }
    render() {
        return this.cachedTranslation;
    }
};
tslib_1.__decorate([
    core_1.Attribute,
    tslib_1.__metadata("design:type", String)
], Translate.prototype, "key", void 0);
tslib_1.__decorate([
    core_1.Attribute,
    tslib_1.__metadata("design:type", Object)
], Translate.prototype, "values", void 0);
tslib_1.__decorate([
    core_1.Attribute,
    tslib_1.__metadata("design:type", typeof (_a = typeof i18next_1.TOptions !== "undefined" && i18next_1.TOptions) === "function" ? _a : Object)
], Translate.prototype, "options", void 0);
Translate = tslib_1.__decorate([
    core_1.WebComponent('st-t')
], Translate);
exports.Translate = Translate;
//# sourceMappingURL=Translate.js.map
});
___scope___.file("i18n/src/interface/LanguageDetectorOptions.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LanguageDetectorOptions.js.map
});
___scope___.file("i18n/src/decorator/Translation.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const i18next_browser_languagedetector_1 = tslib_1.__importDefault(require("i18next-browser-languagedetector"));
const defaults_1 = require("../defaults");
const format_1 = require("../function/format");
// see https://www.i18next.com/overview/configuration-options
function Translation(translationConfig, languageDetectorConfig, onInit) {
    const lngDetector = new i18next_browser_languagedetector_1.default();
    if (languageDetectorConfig) {
        lngDetector.init(languageDetectorConfig);
    }
    if (!translationConfig) {
        translationConfig = {};
    }
    if (!translationConfig.ns) {
        translationConfig.ns = [defaults_1.DEFAULT_NAMESPACE];
    }
    if (!translationConfig.defaultNS) {
        translationConfig.defaultNS = defaults_1.DEFAULT_NAMESPACE;
    }
    if (!translationConfig.fallbackLng) {
        translationConfig.fallbackLng = defaults_1.DEFAULT_FALLBACK_LANGUAGES;
    }
    if (!onInit) {
        onInit = () => { };
    }
    if (!translationConfig.interpolation) {
        translationConfig.interpolation = {};
    }
    if (!translationConfig.interpolation.format) {
        translationConfig.interpolation.format = format_1.format;
    }
    i18next_1.default
        .use(lngDetector)
        .init(translationConfig, onInit);
    // called with @Translation() or @Translation({})
    if (!(typeof translationConfig === 'function')) {
        return (target) => {
            return target;
        };
    }
}
exports.Translation = Translation;
//# sourceMappingURL=Translation.js.map
});
___scope___.file("i18n/src/defaults.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FALLBACK_LANGUAGES = ['en'];
exports.DEFAULT_NAMESPACE = 'common';
//# sourceMappingURL=defaults.js.map
});
___scope___.file("i18n/src/function/format.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("~/core/src/index.js");
const constants_1 = require("../constants");
exports.format = (value, format, lng) => {
    const formatters = core_1.ApplicationContext.getGlobal(constants_1.TRANSLATION_FORMAT);
    if (typeof formatters[format || ''] === 'function') {
        return formatters[format || ''](value, format, lng);
    }
    return value;
};
//# sourceMappingURL=format.js.map
});
___scope___.file("i18n/src/interface/TranslationFormatterMap.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TranslationFormatterMap.js.map
});
___scope___.file("i18n/src/constants.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSLATION_FORMAT = 'TRANSLATION_FORMAT';
//# sourceMappingURL=constants.js.map
});
___scope___.file("i18n/src/decorator/Translations.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const defaults_1 = require("../defaults");
const Translation_1 = require("./Translation");
function Translations(locale, catalog, namespace = defaults_1.DEFAULT_NAMESPACE) {
    // called with @Translations({})
    if (!(typeof catalog === 'function')) {
        return (target) => {
            if (!i18next_1.default.isInitialized) {
                Translation_1.Translation(undefined, undefined, () => {
                    i18next_1.default.addResourceBundle(locale, namespace, catalog, true, true);
                });
            }
            else {
                i18next_1.default.addResourceBundle(locale, namespace, catalog, true, true);
            }
            return target;
        };
    }
}
exports.Translations = Translations;
//# sourceMappingURL=Translations.js.map
});
___scope___.file("i18n/src/interface/TranslationCatalog.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TranslationCatalog.js.map
});
___scope___.file("i18n/src/Translator.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("~/core/src/index.js");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
let Translator = class Translator {
    async changeLanguage(language) {
        return new Promise((resolve) => {
            i18next_1.default.changeLanguage(language, resolve);
        });
    }
    async isInitialized() {
        return new Promise((resolve) => {
            i18next_1.default.init({}, resolve);
        });
    }
    getActiveLanguage() {
        return i18next_1.default.language;
    }
    onLanguageChanged(eventHandler) {
        i18next_1.default.on('languageChanged', eventHandler);
    }
    get i18next() {
        return i18next_1.default;
    }
};
Translator = tslib_1.__decorate([
    core_1.Component
], Translator);
exports.Translator = Translator;
//# sourceMappingURL=Translator.js.map
});
___scope___.file("i18n/src/interface/LanguageChangedHandler.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LanguageChangedHandler.js.map
});
___scope___.file("i18n/src/decorator/TranslationFormat.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("~/core/src/index.js");
const constants_1 = require("../constants");
function TranslationFormat(formatName, formatter) {
    let formatters = core_1.ApplicationContext.getGlobal(constants_1.TRANSLATION_FORMAT);
    if (!formatters)
        formatters = {};
    formatters[formatName] = formatter;
    core_1.ApplicationContext.setGlobal(constants_1.TRANSLATION_FORMAT, formatters);
    // called with @TranslationFormat({})
    if (!(typeof formatName === 'function')) {
        return (target) => {
            return target;
        };
    }
}
exports.TranslationFormat = TranslationFormat;
//# sourceMappingURL=TranslationFormat.js.map
});
___scope___.file("integration-todo/src/translation/en.json", function(exports, require, module){
module.exports = {
  "add": "Add",
  "what_todo_next": "What's TODO next?",
  "remove": "Remove (after 1 sec.)",
  "copyright.firstLine": "Copyright 2019, the SpringType team.",
  "german": "German",
  "english": "English",
  "copyright": {
    "firstLine": "Copyright 2019, the SpringType team.",
    "secondLine": "Build: {{ branch, uppercase }} Time: {{ buildDate, DD-MM-YYYY_HH:mm:ss }}"
  }
};
});
___scope___.file("integration-todo/src/translation/de.json", function(exports, require, module){
module.exports = {
  "add": "Hinzufügen",
  "what_todo_next": "Was als nächstes?",
  "remove": "Löschen (nach 1 Sek.)",
  "german": "Deutsch",
  "english": "Englisch",
  "copyright": {
    "firstLine": "Copyright 2019, das SpringType team.",
    "secondLine": "Build: {{ branch, uppercase }} Zeit: {{ buildDate, DD-MM-YYYY_HH:mm:ss }}"
  }
};
});
	___scope___.entry = "integration-todo/src/index.jsx";
})
FuseBox.import("fuse-box-hot-reload").connect({"port":4444})
//# sourceMappingURL=31cf2ae2_app.js.map