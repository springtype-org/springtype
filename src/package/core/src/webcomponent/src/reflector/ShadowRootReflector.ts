import {AbstractWeakMapReflector} from "../../../di";

export class ShadowRootReflector extends AbstractWeakMapReflector {

    protected static get REFLECTOR_NAME() {
        return 'ShadowRootReflector'
    };

    static set(elementInstance: any, shadowRoot: ShadowRoot) {
        return super.set(elementInstance, shadowRoot);
    }

    static get(elementInstance: any): Element {
        return super.get(elementInstance) || null;
    }

    static has(elementInstance: any): boolean {
        return super.has(elementInstance);
    }
}