import {VirtualElement} from "../../../renderer";

export interface WebComponentLifecycle extends HTMLElement {

    mounted?: boolean;

    init?(): void;

    mount?(): void;
    remount?(): void;
    unmount?(): void;

    // @ts-ignore
    render?(): JSX.Element;

    createNativeElement?(reactCreateElement: VirtualElement): any;

    // TODO: onFieldChanged?(name: string, propName: string, newValue: any, oldValue?: any): void;
    // TODO: onBeforeFieldChange?(name: string, propName: string, newValue: any, oldValue?: any): boolean;

    onAttributeChanged?(name: string, newValue: any, oldValue?: any): void;
    onBeforeAttributeChange?(props: any, name: string | number | symbol, value: any): boolean;

    shouldReflow?(): boolean;
    reflow?(): void;

    shouldAttributeChange?(name: string, oldValue: any, newValue: any): boolean;
    onAttributeChanged?(name: string, oldValue: string, newValue: string): void;

    shouldReflowOnAttributeChange?(attributeName: string, oldValue: any, newValue: any): boolean;
    reflowOnAttributeChange?(attributeName: string, oldValue: any, newValue: any): void;

    mountChildren?(): void;
    remountChildren?(): void;
}