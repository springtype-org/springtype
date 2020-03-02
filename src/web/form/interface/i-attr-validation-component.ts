import {IAttrBaseComponent} from "./i-attr-base-component";

export interface IAttrValidationComponent extends IAttrBaseComponent {
    name: string;
    value?: string;
    validationStrategies?: Array<string>
    validationDebounceTimeInMs?: number
    validators?: Array<(value: string) => Promise<boolean>>
}
