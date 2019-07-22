import {VirtualElement} from "../../../virtualdom";

export interface Lifecycle  {

    onBeforeConnect?(): boolean|void;
    connect?(): void;
    doConnect?(): void;
    onConnect?(): void;

    onBeforeDisconnect?(): boolean|void;
    disconnect?(): void;
    onDisconnect?(): void;

    onBeforeMount?(): boolean|void;
    mount?(): void;
    onMount?(): void;

    onBeforeRender?(): boolean|void;
    render?(): VirtualElement|Array<VirtualElement>|string;
    onRender?(elementsRendered: Array<VirtualElement>): void;

    onBeforeFlow?(initial?: boolean): boolean|void;
    flow?(initial?: boolean, children?: Array<VirtualElement|string>): Promise<void>;
    doFlow?(children?: Array<VirtualElement|string>): void;
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