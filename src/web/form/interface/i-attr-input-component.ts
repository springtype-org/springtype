import {IAttrValidationComponent} from "./i-attr-validation-component";

// @ts-ignore
export interface IAttrInputComponent extends IAttrValidationComponent, Partial<HTMLInputElement> {
    checked?: boolean;
    hidden?: boolean;
    type?: string;
    defaultValue?: string;
    defaultChecked?: boolean;
    rows?: number;
}
