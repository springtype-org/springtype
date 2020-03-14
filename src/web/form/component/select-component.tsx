import {attr, component} from "../../component";
import {IValidationSate} from "../interface/i-validation-sate";
import {DEFAULT_VALIDATION_STATE, ValidationComponent} from "./validation-component";
import {IAttrSelectComponent} from "../interface/i-attr-select-component";
import {htmlCollectionToArray} from "../../../core/lang";


@component({tag: 'select'})
export class Select extends ValidationComponent<IAttrSelectComponent> {
    async doValidation(): Promise<IValidationSate> {
        // throw new Error("Method not implemented.");
        return this.state;
    }

    @attr
    multiple!: boolean;

    state: IValidationSate = Object.freeze(DEFAULT_VALIDATION_STATE);

    constructor() {
        super();
    }

    onAfterElCreate() {
        super.onAfterElCreate();
        if (this.multiple) {
            this.el.setAttribute('multiple', '');
        }
    }

    onAttributeChange(name: string, newValue: string) {
        super.onAttributeChange(name, newValue);
        if (this.INTERNAL.notInitialRender) {
            if (name == 'multiple') {
                this.el.setAttribute('multiple', '');
            }
        }
    }

    render() {
        return this.renderChildren()
    }

    updateValidationState(validationState: IValidationSate) {
        this.state = Object.freeze(validationState);
    }

    getState(): IValidationSate {
        return this.state;
    }

    getValue(): string {
        const values: Array<string> = [];
        const selectEl = this.el as HTMLSelectElement;
        for (const option of htmlCollectionToArray<HTMLOptionElement>(selectEl.selectedOptions)) {
                values.push(option.value);
        }
        const value = values.join(',');

        this.value = value;
        selectEl.value = value;
        return value;
    }

}