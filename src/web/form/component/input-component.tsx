import {attr, component} from "../../component";
import {IValidationSate} from "../interface/i-validation-sate";
import {tsx} from "../../vdom";
import {DEFAULT_VALIDATION_STATE, ValidationComponent} from "./validation-component";
import {AttrType} from "../../component/trait/attr";
import {IAttrInputComponent} from "../interface/i-attr-input-component";


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
        if (this.type == "checkbox" || this.type == "radio") {
            return (this.el as any).checked;
        } else {
            return (this.el as any).value;
        }
    }
}