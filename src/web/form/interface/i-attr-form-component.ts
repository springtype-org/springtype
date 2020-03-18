import {IAttrBaseComponent} from "./i-attr-base-component";
import {StFromValidationEvent} from "../component/form-component";
//@ts-ignore
export interface IAttrFormComponent extends IAttrBaseComponent, Partial<HTMLFormElement> {
    name?: string;
    action?: string;
    onStFormValidation?: (evt:StFromValidationEvent) => void;
}