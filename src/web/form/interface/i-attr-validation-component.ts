import {IAttrBaseComponent} from "./i-attr-base-component";

export interface IAttrValidationComponent extends IAttrBaseComponent {
    validationStrategies?: Array<string>
    validationDebounceTimeInMs?: number
    validators?: Array<(value: string) => Promise<boolean>>

    activeLabelClasses?: Array<string>;
    invalidClasses?: Array<string>;
    validClasses?: Array<string>;

}
