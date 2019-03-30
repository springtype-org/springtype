import {VirtualElement} from "../../../virtualdom";

export interface TemplateFunction {
    (view: any): VirtualElement | Array<VirtualElement>;
}