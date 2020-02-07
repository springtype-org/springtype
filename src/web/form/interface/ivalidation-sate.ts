import {BaseComponent} from "../base-component";
import {IFormValidationStateValue} from "./iform-validation-state-value";

export interface IValidationSate {
    valid: boolean;
    value: string  | Array<string> | IFormValidationStateValue;
    cmp: BaseComponent<any>;
}

export interface IFormValidationSate {
    valid: boolean;
    error?: []
    value: IFormValidationStateValue;
    cmp: BaseComponent<any>;
}