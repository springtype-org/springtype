import {ILifecycle} from "../../component/interface";
import {attr} from "../../component";
import {IValidationSate} from "../interface/i-validation-sate";
import {BaseComponent} from "./base-component";
import {IAttrValidationComponent} from "../interface/i-attr-validation-component";
import {AttrType} from "../../component/trait/attr";
import {st} from "../../../core/st";


const DEFAULT_VALIDATION_DEBOUNCE_TIME_IN_MS = 250;
const DEFAULT_VALIDATION_STRATEGIES = ['keyup', 'change'];

export const DEFAULT_VALIDATION_STATE: IValidationSate = {
    valid: "none",
    errors: []
};

export abstract class ValidationComponent<Attribute extends IAttrValidationComponent> extends BaseComponent<Attribute> implements ILifecycle {
    @attr(AttrType.DOM_TRANSPARENT)
    name!: string;

    @attr
    validationStrategies: Array<string> = DEFAULT_VALIDATION_STRATEGIES;

    @attr
    validationDebounceTimeInMs: number = DEFAULT_VALIDATION_DEBOUNCE_TIME_IN_MS;

    @attr
    validators: Array<(value: string) => Promise<boolean>> = [];

    @attr(AttrType.DOM_TRANSPARENT)
    value: string = '';

    timeout!: NodeJS.Timeout;

    validationPromise!: Promise<any>;

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
        for (const validationEventName of this.validationStrategies) {
            this.el.addEventListener(validationEventName, async () => {
                console.log('validationEventName', validationEventName);
                //finish last validation
                this.validate();
            });
        }
    }

    registerActiveLabelClasses() {
        //after document is loaded set if value is set
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
        if (this.validationPromise) {
            await this.validationPromise;
            delete this.validationPromise;
        }
        return this.validationPromise = new Promise<IValidationSate>(resolve => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(async () => {
                    const value = this.getValue();
                    if (this.validateValue !== value) {
                        this.setCustomError(true);
                        this.validateValue = value;

                        const validationSate = await this.doValidation(value);

                        this.setCustomError(!validationSate.valid);
                        this.updateValidationState(validationSate);
                        resolve(validationSate);
                    }
                    resolve(this.getState())

                },
                this.validationDebounceTimeInMs
            )
        });
    }

    abstract async doValidation(value: string): Promise<IValidationSate>;


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

    abstract getValue(): string;

    abstract getState(): IValidationSate;

    abstract updateValidationState(validationState: IValidationSate): void;


}

