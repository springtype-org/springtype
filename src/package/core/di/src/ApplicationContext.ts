import {BeanFactory} from "./BeanFactory";

export enum ApplicationRuntime {
    WEBBROWSER = "WEBBROWSER",
    EMBEDDED = "EMBEDDED"
}

export enum ApplicationEnvironment {
    PRODUCTION = "PRODUCTION",
    E2E_TEST = "E2E_TEST",
    INTEGRATION_TEST = "INTEGRATION_TEST",
    STAGING = "STAGING",
    DEV = "DEV"
}

export const SYMBOL_APPLICATION_CONTEXT = '__SPRINGTYPE_APPLICATION_CONTEXT__';

export class ApplicationContext extends BeanFactory {

    protected environment: ApplicationEnvironment = ApplicationEnvironment.DEV;
    protected config: any = {};

    setEnvironment(environment: ApplicationEnvironment): void {
        this.environment = environment;
    }

    getEnvironment(): ApplicationEnvironment {
        return this.environment;
    }

    static setGlobal(name: string|number|symbol, value: any): void {
        (<any>ApplicationContext.getRuntimeGlobalObject())[name] = value;
    }

    static getGlobal(name: string|number|symbol): any {
        return (<any>ApplicationContext.getRuntimeGlobalObject())[name];
    }

    static getInstance(): ApplicationContext {

        let globalContext = ApplicationContext.getGlobal(SYMBOL_APPLICATION_CONTEXT);

        if (!globalContext) {
            globalContext = new ApplicationContext();
            ApplicationContext.setGlobal(SYMBOL_APPLICATION_CONTEXT, globalContext);
        }
        return globalContext;
    }

    static getRuntimeGlobalObject(): Object {
        switch (ApplicationContext.getRuntime()) {
            case ApplicationRuntime.WEBBROWSER:
                return window;
        }
        return {}; // FIXME?!
    }

    static getRuntime(): ApplicationRuntime {

        if (typeof window != 'undefined') {
            return ApplicationRuntime.WEBBROWSER;
        }
        return ApplicationRuntime.EMBEDDED;
    }

    set(name: string|number|symbol, value: any) {
        Reflect.set(this.config, name, value);
    }

    get(name: string|number|symbol): any {
        return Reflect.get(this.config, name);
    }
}