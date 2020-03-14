import {attr, component} from "../../component";
import {IValidationSate} from "../interface/i-validation-sate";
import {tsx} from "../../vdom";
import {DEFAULT_VALIDATION_STATE, VALIDATION_VALIDATOR_NAME, ValidationComponent} from "./validation-component";
import {AttrType} from "../../component/trait/attr";
import {IAttrInputComponent} from "../interface/i-attr-input-component";
import {nodeListToArray} from "../../../core/lang";


@component({tag: 'input'})
export class Input extends ValidationComponent<IAttrInputComponent> {

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

    state: IValidationSate = Object.freeze(DEFAULT_VALIDATION_STATE);

    render() {
        return <fragment/>;
    }

    onAttributeChange(name: string, newValue: string) {
        super.onAttributeChange(name, newValue);
        if (this.INTERNAL.notInitialRender) {
            if (name == 'checked') {
                if (this.disabled) {
                    this.el.setAttribute('checked', '');
                } else {
                    this.el.removeAttribute('checked');
                }
            }
            if (name == 'hidden') {
                if (this.disabled) {
                    this.el.setAttribute('hidden', '');
                } else {
                    this.el.removeAttribute('hidden');
                }
            }
            if (name == 'type') {
                this.el.setAttribute('type', this.type);
            }
        }
    }

    onAfterElCreate() {
        super.onAfterElCreate();
        const htmlInput = this.el as HTMLInputElement;
        if (this.defaultValue) {
            htmlInput.defaultValue = this.defaultValue;
        }
        if (this.defaultValue) {
            htmlInput.defaultChecked = this.defaultChecked;
        }
        if (this.checked) {
            htmlInput.setAttribute('checked', '');
        }
        if (this.hidden) {
            htmlInput.setAttribute('hidden', '');
        }
    }

    updateValidationState(validationState: IValidationSate): void {
        this.state = Object.freeze(validationState);
    }

    getState(): IValidationSate {
        return this.state;
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
                        component.setCustomError(!valid);
                        component.updateValidationState({valid, errors});
                    }
                }
            }
        }
        return {valid, errors}
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
        return {valid, errors}
    }
}