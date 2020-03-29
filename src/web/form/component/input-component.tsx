import {attr, component} from "../../component";
import {IValidationSate} from "../interface/i-validation-sate";
import {tsx} from "../../vdom";
import {VALIDATION_VALIDATOR_NAME, ValidationComponent} from "./validation-component";
import {AttrType} from "../../component/trait/attr";
import {IAttrInputComponent} from "../interface/i-attr-input-component";
import {nodeListToArray} from "../../../core/lang";

@component({tag: 'input'})
export class Input extends ValidationComponent<IAttrInputComponent> {

    @attr
    readonly: boolean = false;

    @attr
    checked!: boolean;

    @attr
    hidden!: boolean;

    @attr
    defaultValue!: string;

    @attr
    defaultChecked!: boolean;

    @attr(AttrType.DOM_TRANSPARENT)
    type: string = 'text';

    @attr
    rows: number = 1;


    render() {
        return <fragment/>;
    }

    onAfterElCreate() {
        super.onAfterElCreate();
        const htmlInput = this.el as HTMLInputElement;
        if (this.defaultValue) {
            htmlInput.defaultValue = this.defaultValue;
        }
        if (this.defaultChecked) {
            htmlInput.defaultChecked = this.defaultChecked;
        }
        if (this.checked) {
            htmlInput.setAttribute('checked', '');
        }
        if (this.hidden) {
            htmlInput.setAttribute('hidden', '');
        }
        if (this.rows) {
            htmlInput.setAttribute('rows', this.rows.toString());
        }
        if (this.type) {
            htmlInput.setAttribute('type', this.type);
        }
        if (this.readonly) {
            htmlInput.setAttribute('readonly', 'true');
        }
    }

    getValue(): string {
        if (this.type == "checkbox") {
            return (this.el as any).checked;
        } else if (this.type == "radio") {
            const form = (this.el as HTMLInputElement).form;
            if (form &&
                form.elements &&
                form.elements.namedItem(this.name) &&
                form.elements.namedItem(this.name) instanceof RadioNodeList) {
                return (form.elements.namedItem(this.name) as RadioNodeList).value;
            }
        }
        return (this.el as any).value;
    }

    async doRadioValidation(value: string): Promise<IValidationSate> {
        let valid = true;
        const errors: Array<string> = [];
        let parent = (this.el as HTMLInputElement).form;
        if (parent) {
            const elements = parent.elements;
            if (elements.namedItem(this.name) instanceof RadioNodeList) {
                const radioList = elements.namedItem(this.name) as RadioNodeList;
                for (const radioInput of nodeListToArray<any>(radioList)) {
                    if (radioInput.$stComponent) {
                        // const component = (radioInput as any).$stComponent;
                        const validators = radioInput.$stComponent.validators;
                        if (validators.length > 0) {
                            for (const validator of validators) {
                                if (!await validator(value)) {
                                    valid = false;
                                    errors.push((validator as any)[VALIDATION_VALIDATOR_NAME]);
                                }
                            }
                            break;
                        }
                    }
                }
                for (let i = 0; i < radioList.length; i++) {
                    const radioInput = radioList.item(i);
                    if (radioList && (radioInput as any).$stComponent) {
                        const component = (radioInput as any).$stComponent as Input;
                        component.validationState = ({valid, errors, value});
                        component.updateValidation();
                    }
                }
            }
        }
        return {valid, errors, value}
    }

    async doValidation(value: string): Promise<IValidationSate> {
        let valid = true;
        const errors: Array<string> = [];
        if (this.type == "radio") {
            return this.doRadioValidation(value);
        }

        for (const validator of this.validators) {
            if (!await validator(value)) {
                valid = false;
                errors.push((validator as any)[VALIDATION_VALIDATOR_NAME]);
            }
        }
        return {valid, errors, value}
    }
}