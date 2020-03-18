import {IEvent, IEventListener, ILifecycle} from "../../component/interface";
import {attr, event} from "../../component";
import {IValidationSate} from "../interface/i-validation-sate";
import {BaseComponent} from "./base-component";
import {IAttrValidationComponent} from "../interface/i-attr-validation-component";
import {AttrType} from "../../component/trait/attr";
import {st} from "../../../core/st";
import {nodeListToArray} from "../../../core/lang";

export const VALIDATION_VALIDATOR_NAME = 'VALIDATOR_NAME';

export const DEFAULT_VALIDATION_STATE: IValidationSate = {
    valid: "none",
    errors: []
};

export interface StValidationEvent extends IEvent<StValidationEventDetail> {}

export interface StValidationEventDetail {
    valid: boolean | 'none';
    errors: Array<string>;
    value: string;
}

export abstract class ValidationComponent<Attribute extends IAttrValidationComponent> extends BaseComponent<Attribute> implements ILifecycle {

    @attr(AttrType.DOM_TRANSPARENT)
    name!: string;

    @attr
    validationStrategies!: Array<string>;

    @attr
    validationDebounceTimeInMs!: number;

    @attr
    validators: Array<(value: string) => Promise<boolean>> = [];

    @event
    onStValidation!: IEventListener<Event>;

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

    value: string = '';

    timeout!: NodeJS.Timeout;

    validationReject!: (reason?: any) => void;

    validateValue!: string;

    onAfterElCreate() {
        super.onAfterElCreate();
        if (this.name) {
            this.el.setAttribute('name', this.name);
        } else {
            if (this instanceof ValidationComponent) {
                st.error(`${this.constructor.name} needs an name attribute`, this);
            }
        }
        this.registerValidationStrategies();
        this.registerActiveLabelClasses();
    }

    onAttributeChange(name: string, newValue: string) {
        super.onAttributeChange(name, newValue);
        if (this.INTERNAL.notInitialRender) {
            if (name == 'value') {
                this.el.setAttribute('value', newValue);
            }
            if (name == 'name') {
                this.el.setAttribute('name', newValue);
            }
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
        //after document is loaded set if value is set
        document.addEventListener('DOMContentLoaded', () => {
            if (this.getValue()) {
                for (const label of this.getLabels()) {
                    label.classList.add(...this.getActiveLabelClasses());
                }
            }
        });

        //on focus
        this.el.addEventListener('focus', () => {
            for (const label of this.getLabels()) {
                label.classList.add(...this.getActiveLabelClasses());
            }
        });

        //on focus remove
        this.el.addEventListener('blur', () => {
            //Do not remove if value exist
            if (!!(this.el as any).value) {
                return;
            }
            for (const label of this.getLabels()) {
                label.classList.remove(...this.getActiveLabelClasses());
            }
        });
    }

    getLabels(): Array<HTMLLabelElement> {
        //no polyfill needed
        const labelNodeList = document.querySelectorAll(`label[for=${this.el.getAttribute('id') || 'none'}]`);
        return nodeListToArray(labelNodeList);
    }

    async validate(): Promise<IValidationSate> {
        if (this.validationReject) {
            this.validationReject({reason: 'validation', message: `rejected validation ${this.name}`});
            delete this.validationReject;
        }
        return new Promise<IValidationSate>((resolve, reject) => {
            this.validationReject = reject;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(async () => {
                    const value = this.getValue();
                    if (this.validateValue !== value) {
                        this.setCustomError(true);
                        this.validateValue = value;

                        const validationSate = await this.doValidation(value);
                        this.setCustomError(!validationSate.valid);
                        this.updateValidationState(validationSate);

                        this.dispatchStValidation({...validationSate, value});

                        resolve(validationSate);
                    }
                    resolve(this.getState())

                },
                this.validationDebounceTimeInMs || st.form.debounceTimeInMs
            )
        });
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

    abstract getState(): IValidationSate;

    abstract updateValidationState(validationState: IValidationSate): void;
}

