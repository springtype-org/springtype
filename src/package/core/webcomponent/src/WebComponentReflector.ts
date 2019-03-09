
const TAG_NAME = 'TAG_NAME';

export class WebComponentReflector {

    static getTagName(component: Element): string {
        return Reflect.get(component, TAG_NAME);
    }

    static setTagName(component: Element, tagName: string): void {
        Reflect.set(component, TAG_NAME, tagName);
    }
}