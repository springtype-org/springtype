import {IAttrBaseComponent} from "./i-attr-base-component";
//@ts-ignore
export interface IAttrFormComponent extends IAttrBaseComponent, Partial<HTMLFormElement> {
    name?: string;
    action?: string;
}