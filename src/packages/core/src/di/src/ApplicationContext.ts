import {BeanFactory} from "./BeanFactory";
import {ApplicationRuntime} from "./enum/ApplicationRuntime";
import {ApplicationEnvironment} from "./enum/ApplicationEnvironment";

const APPLICATION_CONTEXT = 'APPLICATION_CONTEXT';

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

        let globalContext = ApplicationContext.getGlobal(APPLICATION_CONTEXT);

        if (!globalContext) {
            globalContext = new ApplicationContext();
            ApplicationContext.setGlobal(APPLICATION_CONTEXT, globalContext);
        }
        return globalContext;
    }

    static getRuntimeGlobalObject(): Object {

        // Note: maybe use globalThis someday

        switch (ApplicationContext.getRuntime()) {
            case ApplicationRuntime.WEBBROWSER:

                if (!(window as any)['$st']) {
                    (window as any)['$st'] = {};
                }
                return (window as any).$st;
        }

        // return local object context
        return {};
    }

    static getRuntime(): ApplicationRuntime {

        if (typeof window != 'undefined') {
            return ApplicationRuntime.WEBBROWSER;
        }
        return ApplicationRuntime.NODE;
    }

    set(name: string|number|symbol, value: any) {
        Reflect.set(this.config, name, value);
    }

    get(name: string|number|symbol): any {
        return Reflect.get(this.config, name);
    }
}