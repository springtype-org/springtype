import {VirtualElement} from "../../../virtualdom";

export interface Lifecycle  {

    //https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks
    doConnect(): void;

    onBeforeDisconnect?(): boolean|void;
    disconnect?(): void;
    onDisconnect?(): void;

    render(): VirtualElement|Array<VirtualElement>|string;

    flow?(initial?: boolean): Promise<void>;
    doFlow(): void;
    onFlow?(initial?: boolean): void;

    // native web component callbacks
    attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    adoptedCallback?(): void;

    shouldAttributeChange?(name: string, oldValue: any, newValue: any): boolean;
    onBeforeAttributeChange?(name: string, oldValue: any, newValue?: any): boolean|void;
    changeAttribute?(name: string, newValue: any): void;
    onAttributeChanged?(name: string, oldValue: any, newValue?: any): void;

    // TODO: "shouldFlowOnAttributeChange"
    shouldReflowOnAttributeChange?(attributeName: string, oldValue: any, newValue: any): boolean;
    flowOnAttributeChange?(attributeName: string, oldValue: any, newValue: any): void;

    // TODO: onFieldChanged?(name: string, propName: string, newValue: any, oldValue?: any): void;
    // TODO: onBeforeFieldChange?(name: string, propName: string, newValue: any, oldValue?: any): boolean;

}