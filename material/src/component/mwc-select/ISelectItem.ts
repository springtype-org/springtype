import {IVirtualNode} from "../../../../src/web/vdom/interface";

export interface ISelectItem<Value = any> {
    value: Value;
    displayValue: string | IVirtualNode;
}