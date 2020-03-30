import {IEventListener, ILifecycle} from "../../component/interface";
import {attr, event} from "../../component";
import {IValidationSate} from "../interface/i-validation-sate";
import {BaseComponent} from "./base-component";
import {IAttrValidationComponent} from "../interface/i-attr-validation-component";
import {AttrType} from "../../component/trait/attr";
import {st} from "../../../core/st";
import {nodeListToArray} from "../../../core/lang";
import {IElement} from "../../vdom/interface";

export const VALIDATION_VALIDATOR_NAME = 'VALIDATOR_NAME';

export const DEFAULT_VALIDATION_STATE: IValidationSate = {
    valid: "none",
    errors: [],
    value: ''
};

export interface StValidationEventDetail {
    valid: boolean | 'none';
    errors: Array<string>;
    value: string;
}

export abstract class ValidationComponent<Attribute extends IAttrValidationComponent> extends BaseComponent<Attribute> implements ILifecycle {

    @attr(AttrType.DOM_TRANSPARENT)
    name!: string;

    @attr
    ignore: boolean = false;

    @attr
    validationStrategies!: Array<string>;

    @attr
    validationDebounceTimeInMs!: number;

    @attr
    validators: Array<(value: string) => Promise<boolean>> = [];

    @event
    onStValidation!: IEventListener<StValidationEventDetail>;

    @attr
    value: string = '';

    validationState: IValidationSate = Object.freeze(DEFAULT_VALIDATION_STATE);

    timeout!: NodeJS.Timeout;

    validationReject!: (reason?: any) => void;

    validateValue!: string;

    dispatchStValidation = (detail: StValidationEventDetail) => {
        this.dispatchEvent<StValidationEventDetail>("stValidation", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                ...detail,
            },
        });
    };


    shouldAttributeChange(name: string, newValue: any, oldValue: any): boolean {
        if (!super.shouldAttributeChange(name, newValue, oldValue)) {
            return false;
        }
        if (this.INTERNAL.notInitialRender) {
            if (name == 'value') {
                this.setValue(newValue);
                return false
            }
            if (name == 'name') {
                this.setName(newValue)
                return false
            }
        } else {
            if (name == 'value') {
                this.validationState = Object.freeze({...this.validationState, value: newValue})
            }
        }
        return true;
    }

    onAfterElCreate(el: IElement) {
        super.onAfterElCreate(el);
        this.setName(this.name);
        this.setValue(this.value);
        this.registerValidationStrategies();
        this.registerActiveLabelClasses();
    }

    setValue(value: string){
        this.el.setAttribute('value', value);
        this.validationState = Object.freeze({...this.validationState, value: value})
    }
    setName(name: string) {
        if (name) {
            this.el.setAttribute('name', this.name);
        } else {
            st.error(`${this.constructor.name} needs an name attribute`, this);
        }
    }


    registerValidationStrategies() {
        for (const validationEventName of (this.validationStrategies || st.form.validationStrategies)) {
            this.el.addEventListener(validationEventName, async () => {
                //finish last validation
                try {
                    await this.validate();
                } catch (e) {
                    if (!e.reason || e.reason !== 'validation') {
                        throw e;
                    }
                }
            });
        }
    }

    registerActiveLabelClasses() {
        //on focus
        this.el.addEventListener('focus', () => {
            this.onLabelActive();
        });

        //on focus remove
        this.el.addEventListener('blur', () => {
            if (!this.validationState.value) {
                this.onLabelInactive();
            }
        });
    }

    updateLabels() {
        if (!!this.validationState.value) {
            this.onLabelActive();
        } else {
            this.onLabelInactive();
        }
    }

    onLabelActive() {
        for (const label of this.getLabels()) {
            label.classList.add(...this.getActiveLabelClasses());
        }
    }

    onLabelInactive() {
        for (const label of this.getLabels()) {
            label.classList.remove(...this.getActiveLabelClasses());
        }
    }

    getLabels(): Array<HTMLLabelElement> {
        const labelNodeList = document.querySelectorAll(`label[for=${this.el.getAttribute('id') || 'none'}]`);
        return nodeListToArray(labelNodeList);
    }

    async validate(force: boolean = false): Promise<IValidationSate> {
        if (this.validationReject) {
            this.validationReject({reason: 'validation', message: `rejected validation ${this.name}`});
            delete this.validationReject;
        }
        return new Promise<IValidationSate>((resolve, reject) => {
            this.validationReject = reject;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(async () => {
                    const value = this.getValue();
                    if (force || this.validateValue !== value) {
                        this.setCustomError(true);
                        this.validateValue = value;

                        this.validationState = await this.doValidation(value);
                        this.updateValidation();
                    }
                    resolve(this.validationState);
                },
                this.validationDebounceTimeInMs || st.form.debounceTimeInMs
            )
        });
    }

    updateValidation() {
        this.setCustomError(!this.validationState.valid);
        this.dispatchStValidation({...this.validationState});
        this.updateLabels();
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

    abstract async doValidation(value: string): Promise<IValidationSate>;

    abstract getValue(): string;
}

