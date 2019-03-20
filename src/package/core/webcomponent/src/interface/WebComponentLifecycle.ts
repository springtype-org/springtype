import {VirtualElement} from "../../../renderer";

export interface WebComponentLifecycle extends HTMLElement {

    readonly _shadowRoot?: Element;

    onBeforeConnect?(): boolean|void;
    connect?(): void;
    onConnect?(): void;

    readonly connected?: boolean;
    onBeforeDisconnect?(): boolean|void;
    disconnect?(): void;
    onDisconnect?(): void;

    onBeforeDisconnectChildren?(): boolean|void;
    disconnectChildren?(): void;
    onDisconnectChildren?(): void;

    onBeforeMount?(): boolean|void;
    mount?(): void;
    onMount?(): void;

    createNativeElement?(virtualElement: VirtualElement): any;

    onBeforeRender?(): boolean|void;
    render?(): VirtualElement|Array<VirtualElement>;
    onRender?(elements: Array<VirtualElement>): void;

    onBeforeFlow?(initial: boolean): boolean|void;
    flow?(initial: boolean): void;
    onFlow?(initial: boolean): void;

    shouldReflow?(): boolean;
    onBeforeReflow?(): boolean|void;
    reflow?(): void;
    onReflow?(): boolean;

    attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    adoptedCallback?(): void;

    shouldAttributeChange?(name: string, oldValue: any, newValue: any): boolean;
    onBeforeAttributeChange?(name: string, oldValue: any, newValue?: any): boolean|void;
    changeAttribute?(name: string, newValue: any): void;
    onAttributeChanged?(name: string, oldValue: any, newValue?: any): void;

    shouldReflowOnAttributeChange?(attributeName: string, oldValue: any, newValue: any): boolean;
    reflowOnAttributeChange?(attributeName: string, oldValue: any, newValue: any): void;

    // TODO: onFieldChanged?(name: string, propName: string, newValue: any, oldValue?: any): void;
    // TODO: onBeforeFieldChange?(name: string, propName: string, newValue: any, oldValue?: any): boolean;

}