import {VirtualElement} from "../../../renderer";

export interface WebComponentLifecycle extends HTMLElement {

    mounted?: boolean;
    propsField?: string;

    init?(): void;

    mount?(): void;

    remount?(): void;

    // @ts-ignore
    render?(): JSX.Element;

    createNativeElement?(reactCreateElement: VirtualElement): any;

    unmount?(): void;

    onPropChanged?(name: string, newValue: any, oldValue?: any): void;

    onBeforePropsChange?(props: any, name: string | number | symbol, value: any): boolean;
    onPropsChanged?(props: any, name: string | number | symbol, value: any): void;

    reflow?(): void;

    mountChildren?(): void;

    remountChildren?(): void;
}