import {BeanFactory} from "./BeanFactory";
import {WebAppConfig} from "../../webapp";

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

export class ApplicationContext extends BeanFactory {

    protected static defaultInstance: ApplicationContext = new ApplicationContext();

    protected environment: ApplicationEnvironment = ApplicationEnvironment.DEV;
    protected webAppConfig!: WebAppConfig;
    protected config: any = {};

    setEnvironment(environment: ApplicationEnvironment): void {
        this.environment = environment;
    }

    getEnvironment(): ApplicationEnvironment {
        return this.environment;
    }

    static getInstance(): ApplicationContext {
        return ApplicationContext.defaultInstance;
    }

    static getRuntime(): ApplicationRuntime {

        if (typeof window != 'undefined') {
            return ApplicationRuntime.WEBBROWSER;
        }
        return ApplicationRuntime.EMBEDDED;
    }

    setWebAppConfig(config: WebAppConfig) {
        this.webAppConfig = config;
    }

    getWebAppConfig(): WebAppConfig {
        return this.webAppConfig;
    }

    set(name: string|number|symbol, value: any) {
        Reflect.set(this.config, name, value);
    }

    get(name: string|number|symbol): any {
        return Reflect.get(this.config, name);
    }
}