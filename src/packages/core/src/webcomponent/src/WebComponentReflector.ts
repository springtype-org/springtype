import {ApplicationContext, ComponentImpl} from "../../di";
import {RegisteredWebComponents} from "./interface/RegisteredWebComponents";

const TAG_NAME = 'TAG_NAME';
const WEB_COMPONENTS_REGISTERED = 'WEB_COMPONENTS_REGISTERED';

export class WebComponentReflector {

    static getTagName(component: ComponentImpl<any>): string {
        return Reflect.get(component, TAG_NAME);
    }

    static setTagName(component: ComponentImpl<any>, tagName: string): void {
        Reflect.set(component, TAG_NAME, tagName);
    }

    static registerByTagName(tagName: string, component: ComponentImpl<any>): void {
        const registeredWebComponents: RegisteredWebComponents = WebComponentReflector.getAll();
        registeredWebComponents[tagName.toUpperCase()] = component;
        ApplicationContext.setGlobal(WEB_COMPONENTS_REGISTERED, registeredWebComponents);
    }

    static getByTagName(tagName: string): ComponentImpl<any> {
        if (!tagName) tagName = '';
        const registeredWebComponents: RegisteredWebComponents = WebComponentReflector.getAll();
        return registeredWebComponents[tagName.toUpperCase()];
    }

    static getAll(): RegisteredWebComponents {
        return ApplicationContext.getGlobal(WEB_COMPONENTS_REGISTERED) || {};
    }
}