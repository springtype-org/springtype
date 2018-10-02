import {Subject} from "rxjs/internal/Subject";

export interface WebComponentConfig {
    tag: string;
    props?: Array<string>;
}

export interface WebComponentLifecycle {
    propertyChange?: Subject<PropertyChangeEvent>;
    lifecycleChange?: Subject<LifecycleEvent>;
    init?(): void;
    mount?(): void;
    unmount?(): void;
    onPropertyChange?(prop: string, newValue: any, oldValue?: any): void;
}

export interface PropertyChangeEvent {
    prop: string;
    newValue: any;
    oldValue: any;
}

export enum LifecycleEvent {
    INIT = 'INIT',
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
}

export interface IWebComponent<WC> extends Function {
    new(...args: any[]): WC;
}

export function WebComponent<WC extends IWebComponent<any>>(config: WebComponentConfig): WC|any {

    if (!config.props) config.props = [];

    return (target: WC) => {

        let derivedCustomWebComponent = class extends target implements WebComponentLifecycle {

            // symbol based so it doesn't collide with members
            protected _propertyChangeEmitter = new Subject<PropertyChangeEvent>();
            protected _lifecycleEventEmitter = new Subject<LifecycleEvent>();

            constructor(...args: Array<any>) {
                super();
                this.lifecycleChange.next(LifecycleEvent.INIT);
                this.init();
            }

            get propertyChange(): Subject<PropertyChangeEvent> {
                return this._propertyChangeEmitter;
            }

            get lifecycleChange(): Subject<LifecycleEvent> {
                return this._lifecycleEventEmitter;
            }

            static get observedAttributes() {
                return config.props;
            }

            attributeChangedCallback(prop: string, oldValue: any, newValue: any) {
                this.propertyChange.next({
                    prop,
                    oldValue,
                    newValue
                });
                this.onPropertyChange(prop, newValue, oldValue);
            }

            connectedCallback() {
                this.lifecycleChange.next(LifecycleEvent.CONNECTED);
                this.mount();
            }

            disconnectedCallback() {
                this.lifecycleChange.next(LifecycleEvent.DISCONNECTED);
                this.unmount();
            }
        };

        // register custom element
        window.customElements.define(config.tag, derivedCustomWebComponent);

        return derivedCustomWebComponent;
    }
}