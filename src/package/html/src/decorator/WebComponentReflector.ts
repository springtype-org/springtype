
const TAG_NAME = Symbol('TAG_NAME');

export class WebComponentReflector {

    static getTagName(component: HTMLElement): string {
        return Reflect.get(component, TAG_NAME);
    }

    static setTagName(component: HTMLElement, tagName: string): void {
        Reflect.set(component, TAG_NAME, tagName);
    }
}