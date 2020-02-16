import {IAttrValidationComponent} from "./i-attr-validation-component";

// @ts-ignore
export interface IAttrSelectComponent extends IAttrValidationComponent, Partial<HTMLSelectElement> {
    multiple?: boolean
}