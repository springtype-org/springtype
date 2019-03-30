import {ApplicationContext, ComponentImpl} from "../../di";

const TAG_NAME = 'TAG_NAME';
const WEB_COMPONENTS_REGISTERED = 'WEB_COMPONENTS_REGISTERED';

export class WebComponentReflector {

    static getTagName(component: ComponentImpl<any>): string {
        return Reflect.get(component, TAG_NAME);
    }

    static setTagName(component: ComponentImpl<any>, tagName: string): void {
        Reflect.set(component, TAG_NAME, tagName);
    }

    static registerByTagName(tagName: string): void {
        const registeredWebComponents: Array<string> = WebComponentReflector.getAll();
        registeredWebComponents.push(tagName.toUpperCase());
        ApplicationContext.setGlobal(WEB_COMPONENTS_REGISTERED, registeredWebComponents);
    }

    static getAll(): Array<string> {
        return ApplicationContext.getGlobal(WEB_COMPONENTS_REGISTERED) || [];
    }
}