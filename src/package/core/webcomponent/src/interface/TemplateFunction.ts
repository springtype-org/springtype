import {VirtualElement} from "../../../renderer";

export interface TemplateFunction {
    (view: any): VirtualElement | Array<VirtualElement>;
}