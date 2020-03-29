import {IAttrBaseComponent} from "./i-attr-base-component";
import {StValidationEventDetail} from "../component/validation-component";
import {IEvent} from "../../component/interface";

export interface IAttrValidationComponent extends IAttrBaseComponent {
    name: string;
    value?: string;
    ignore?: boolean;
    validationStrategies?: Array<string>
    validationDebounceTimeInMs?: number
    validators?: Array<(value: string) => Promise<boolean>>
    onStValidation?: (evt: IEvent<StValidationEventDetail>) => void
}
