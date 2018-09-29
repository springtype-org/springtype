import {BeanFactory} from "./BeanFactory";

export class ApplicationContext extends BeanFactory {

    protected static defaultInstance: ApplicationContext = new ApplicationContext();

    static getInstance(): ApplicationContext {
        return ApplicationContext.defaultInstance;
    }
}