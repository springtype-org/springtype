import {BeanFactory} from "./BeanFactory";
import {ApplicationEnvironment, getRuntimeGlobalObject} from "../../environment";

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
        (<any>getRuntimeGlobalObject())[name] = value;
    }

    static getGlobal(name: string|number|symbol): any {
        return (<any>getRuntimeGlobalObject())[name];
    }

    static getInstance(): ApplicationContext {

        let globalContext = ApplicationContext.getGlobal(APPLICATION_CONTEXT);

        if (!globalContext) {
            globalContext = new ApplicationContext();
            ApplicationContext.setGlobal(APPLICATION_CONTEXT, globalContext);
        }
        return globalContext;
    }

    set(name: string|number|symbol, value: any) {
        Reflect.set(this.config, name, value);
    }

    get(name: string|number|symbol): any {
        return Reflect.get(this.config, name);
    }
}