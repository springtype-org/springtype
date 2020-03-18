import {IAttrBaseComponent} from "./i-attr-base-component";
import {StValidationEvent} from "../component/validation-component";

export interface IAttrValidationComponent extends IAttrBaseComponent {
    name: string;
    value?: string;
    validationStrategies?: Array<string>
    validationDebounceTimeInMs?: number
    validators?: Array<(value: string) => Promise<boolean>>
    onStValidation?: (evt: StValidationEvent) => void
}
