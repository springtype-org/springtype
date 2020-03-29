import {IAttrValidationComponent} from "./i-attr-validation-component";

// @ts-ignore
export interface IAttrInputComponent extends IAttrValidationComponent, Partial<HTMLInputElement> {
    checked?: boolean;
    hidden?: boolean;
    type?: string;
    readonly?: boolean;
    defaultValue?: string;
    defaultChecked?: boolean;
    rows?: number;
}
