import {VirtualElement} from "../../../renderer";

export interface WebComponentLifecycle extends HTMLElement {

    init?(): void;

    mount?(): void;

    remount?(): void;

    // @ts-ignore
    render?(): JSX.Element;

    createNativeElement?(reactCreateElement: VirtualElement): any;

    unmount?(): void;

    onPropChanged?(name: string, newValue: any, oldValue?: any): void;

    onPropsChanged?(props: any, name: string | number | symbol, value: any): void;

    reflow?(): void;

    mountChildren?(): void;

    remountChildren?(): void;
}