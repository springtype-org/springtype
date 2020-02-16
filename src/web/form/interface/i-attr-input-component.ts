import {IAttrValidationComponent} from "./i-attr-validation-component";

// @ts-ignore
export interface IAttrInputComponent extends IAttrValidationComponent, Partial<HTMLInputElement> {
    checked?: boolean;
    hidden?: boolean;
    value?: string;
    type?: string;
}