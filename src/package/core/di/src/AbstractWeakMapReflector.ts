import {ApplicationContext} from "./ApplicationContext";

export class AbstractWeakMapReflector {

    protected static get REFLECTOR_NAME() { return '' };
    protected static state: WeakMap<any, any>;

    static setup() {
        this.state = ApplicationContext.getGlobal(this.REFLECTOR_NAME);
        if (!this.state) {
            this.state = new WeakMap();
            ApplicationContext.setGlobal(this.REFLECTOR_NAME, this.state);
        }
    }

    static set(instance: any, value: any) {
        if (!this.state) this.setup();
        this.state.set(instance, value);
    }

    static get(instance: any): any {
        if (!this.state) this.setup();
        return this.state.get(instance);
    }

    static has(instance: any): boolean {
        if (!this.state) this.setup();
        return this.state.has(instance);
    }
}