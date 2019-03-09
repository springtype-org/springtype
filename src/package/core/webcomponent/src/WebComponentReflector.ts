import {IComponent} from "../../di";

const TAG_NAME = 'TAG_NAME';

export class WebComponentReflector {

    static getTagName(component: IComponent<any>): string {
        return Reflect.get(component, TAG_NAME);
    }

    static setTagName(component: IComponent<any>, tagName: string): void {
        Reflect.set(component, TAG_NAME, tagName);
    }
}