import {ApplicationContext, ComponentImpl} from "../../di";
import {TAG_NAME} from "./constant/TAG_NAME";

// TODO: Use AbstractWeakMapReflector
export class WebComponentReflector {

    static WEB_COMPONENTS_REGISTERED = 'WEB_COMPONENTS_REGISTERED';

    static getTagName(component: ComponentImpl<any>): string {
        return Reflect.get(component, TAG_NAME);
    }

    static setTagName(component: ComponentImpl<any>, tagName: string): void {
        Reflect.set(component, TAG_NAME, tagName);
    }

    static registerByTagName(tagName: string): void {

        const registeredWebComponents: Array<string> = WebComponentReflector.getAll();
        registeredWebComponents.push(tagName.toUpperCase());
        ApplicationContext.setGlobal(WebComponentReflector.WEB_COMPONENTS_REGISTERED, registeredWebComponents);
    }

    static getAll(): Array<string> {
        return ApplicationContext.getGlobal(WebComponentReflector.WEB_COMPONENTS_REGISTERED) || [];
    }
}