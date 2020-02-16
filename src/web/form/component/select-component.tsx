import {attr, component} from "../../component";
import {IValidationSate} from "../interface/i-validation-sate";
import {DEFAULT_VALIDATION_STATE, ValidationComponent} from "./validation-component";
import {IAttrSelectComponent} from "../interface/i-attr-select-component";


@component({tag: 'select'})
export class Select extends ValidationComponent<IAttrSelectComponent> {

    @attr
    multiple!: boolean;

    state: IValidationSate = Object.freeze(DEFAULT_VALIDATION_STATE);

    constructor() {
        super();
    }
    onAfterElCreate() {
        super.onAfterElCreate();
    }
    render() {
        return this.renderChildren()
    }

    updateValidationState(validationState: IValidationSate): void {
        this.state = Object.freeze(validationState);
    }

    getState(): IValidationSate {
        return this.state;
    }

    getValue(): string {
        const values: Array<string> = [];
        for (const option of (this.el as any).selectedOptions) {
            values.push(option.value);
        }
        const value = values.join(',');

      this.value = value;
        (this.el as any).value = value;
        return value;
    }

}