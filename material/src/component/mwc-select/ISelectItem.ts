import {IVirtualNode} from "../../../../src/web/vdom/interface";

export interface ISelectItem<Data = any> {
    value: string;
    data: Data;
    displayValue: string | IVirtualNode;
}