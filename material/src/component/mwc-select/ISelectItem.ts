import {IVirtualNode} from "../../../../src/web/vdom/interface";

export interface ISelectItem<Value = any> {
    id: string;
    value: Value;
    displayValue: string | IVirtualNode;
}