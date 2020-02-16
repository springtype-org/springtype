import {ILifecycle} from "../../component/interface";
import {attr} from "../../component";
import {IValidationSate} from "../interface/i-validation-sate";
import {BaseComponent} from "./base-component";
import {IAttrValidationComponent} from "../interface/i-attr-validation-component";
import {Form} from "./form-component";
import {AttrType} from "../../component/trait/attr";


const DEFAULT_VALIDATION_DEBOUNCE_TIME_IN_MS = 250;
const DEFAULT_VALIDATION_STRATEGIES = ['keyup', 'change'];

export const DEFAULT_VALIDATION_STATE: IValidationSate = {
    valid: "none",
    errors: []
};

export abstract class ValidationComponent<Attribute extends IAttrValidationComponent> extends BaseComponent<Attribute> implements ILifecycle {

    @attr
    validationStrategies: Array<string> = DEFAULT_VALIDATION_STRATEGIES;

    @attr
    validationDebounceTimeInMs: number = DEFAULT_VALIDATION_DEBOUNCE_TIME_IN_MS;

    @attr
    validators: Array<(value: string) => Promise<boolean>> = [];

    @attr
    activeLabelClasses!: Array<string>;

    @attr
    invalidClasses!: Array<string>;

    @attr
    validClasses!: Array<string>;

    @attr(AttrType.DOM_TRANSPARENT)
    value: string = '';

    timeout!: NodeJS.Timeout;
    validation!: Promise<any>;

    validateValue!: string;

    onAfterElCreate() {
        super.onAfterElCreate();
        this.registerValidationStrategies();
        this.registerActiveLabelClasses();
    }

    onAttributeChange(name: string, newValue: string) {
        super.onAttributeChange(name, newValue);
        if (this.INTERNAL.notInitialRender) {
            if (name == 'value') {
                this.el.setAttribute('value', newValue);
            }
        }
    }

    registerValidationStrategies() {
        for (const validationEventName of this.validationStrategies) {
            this.el.addEventListener(validationEventName, async () => {
                console.log('validationEventName',validationEventName );
                //finish last validation
                if (this.validation) {
                    await this.validation;
                    delete this.validation;
                }
                clearTimeout(this.timeout);
                this.timeout = setTimeout(async () => {
                        this.validation = this.validate();
                        await this.validation;

                    },
                    this.validationDebounceTimeInMs
                )
            });
        }
    }

    registerActiveLabelClasses() {
        //after document is loaded
        document.addEventListener('DOMContentLoaded', () => {
            if (this.getValue()) {
                for (const label of this.getLabels()) {
                    (label as HTMLElement).classList.add(...this.getActiveLabelClasses());
                }
            }
        });

        //on focus
        this.el.addEventListener('focus', () => {
            for (const label of this.getLabels()) {
                (label as HTMLElement).classList.add(...this.getActiveLabelClasses());
            }
        });
        //on focus remove
        this.el.addEventListener('blur', () => {
            //Do not remove if value exist
            if (!!(this.el as any).value) {
                return;
            }
            for (const label of this.getLabels()) {
                (label as HTMLElement).classList.remove(...this.getActiveLabelClasses());
            }
        });
    }

    getLabels(): NodeList {
        //no polyfill needed
        return document.querySelectorAll(`label[for=${this.name}]`);
    }


    async validate(): Promise<IValidationSate> {

        const value = this.getValue();
        if (this.validateValue === value) {
            return this.getState();
        }
        this.setCustomError(true);
        this.validateValue = value;

        let valid = true;
        const errors: Array<string> = [];

        for (const validator of this.validators) {
            if (!await validator(value)) {
                valid = false;
                errors.push((validator as any)['VALIDATOR_NAME']);
            }
        }
        this.setCustomError(!valid);

        const validationState = {valid, errors};
        this.updateValidationState(validationState);
        return validationState;
    }

    getInvalidClasses() {
        if (this.invalidClasses) {
            return this.invalidClasses;
        }
        //take from parent from
        const parentForm = this.getParentForm();
        if (parentForm && parentForm.invalidClasses) {
            return parentForm.invalidClasses;
        }
        return [];
    }

    getValidClasses() {
        if (this.validClasses) {
            return this.validClasses;
        }
        //take from parent from
        const parentForm = this.getParentForm();
        if (parentForm && parentForm.validClasses) {
            return parentForm.validClasses;
        }
        return [];
    }

    getParentForm(): Form | undefined {
        const parentForm = (this.el as any).form;
        if (parentForm && parentForm.$stComponent instanceof Form) {
            return parentForm.$stComponent as Form;
        }
    }

    getActiveLabelClasses(): Array<string> {
        //take own
        if (this.activeLabelClasses) {
            return this.activeLabelClasses;
        }

        //take from parent from
        const parentForm = (this.el as any).form;
        if (parentForm && parentForm.$stComponent instanceof Form) {
            const parentCmpForm = parentForm.$stComponent as Form;
            if (parentCmpForm.activeLabelClasses) {
                return parentCmpForm.activeLabelClasses;
            }
        }
        return [];
    }

    setCustomError(error: boolean) {
        const validClasses = this.getValidClasses();
        const invalidClasses = this.getInvalidClasses();
        if (error) {
            this.el.classList.add(...invalidClasses);
            this.el.classList.remove(...validClasses);
            (this.el as any).setCustomValidity(' ');
        } else {
            this.el.classList.remove(...invalidClasses);
            this.el.classList.add(...validClasses);
            (this.el as any).setCustomValidity('');
        }
    }

  abstract  getValue(): string;

    abstract getState(): IValidationSate;

    abstract updateValidationState(validationState: IValidationSate): void;


}

