import {ILifecycle} from "../component/interface";
import {attr} from "../component";
import {BaseComponent} from "./base-component";
import {IValidationSate} from "./interface/ivalidation-sate";


const DEFAULT_VALIDATION_DEBOUNCE_TIME_IN_MS = 250;
const DEFAULT_VALIDATION_STRATEGIES = ['keyup', 'change'];

export interface IAttrBaseInputComponent  {
    validationStrategies?: Array<string>
    validationDebounceTimeInMs?: number
    validators?: Array<(value: string) => Promise<boolean>>
}

export abstract class BaseInputComponent<A extends IAttrBaseInputComponent> extends BaseComponent<A> implements ILifecycle {


    @attr
    validationStrategies: Array<string> = DEFAULT_VALIDATION_STRATEGIES;

    @attr
    validationDebounceTimeInMs: number = DEFAULT_VALIDATION_DEBOUNCE_TIME_IN_MS;

    @attr
    validators: Array<(value: string) => Promise<boolean>> = [];

    timeout!: NodeJS.Timeout;
    resolve!: (value?: boolean | PromiseLike<boolean>) => void;

    onAfterElCreate() {
        for (const validationEventName of this.validationStrategies) {
            this.el.addEventListener(validationEventName, (evt: Event) => {
                const value: string | Array<string> = this.getValueFromEvent(evt);
                if (this.timeout) {
                    //debounce
                    clearTimeout(this.timeout);
                }
                if (this.resolve) {
                    //break an running promise
                    this.resolve(false);
                }
                this.timeout = setTimeout(async () => {
                    new Promise<boolean>(async (resolve) => {
                        this.resolve = resolve;
                        resolve(this.validate(value))
                    }).then(validationResult => {
                            const state = this.updateState(validationResult, value);
                            if (this.parentForm) {
                                this.parentForm.state.value[this.name] = state;
                            }
                        }
                    );

                }, this.validationDebounceTimeInMs);
            })
        }
    }

    async validate(value: string | Array<string>) {
        let valid = true;
        for (const validator of this.validators) {
            if (Array.isArray(value)) {
                for (const val of value) {
                    if (!await validator(val)) {
                        valid = false;
                    }
                }
            } else {
                if (!await validator(value)) {
                    valid = false;
                }
            }
        }
        return valid;
    }

    abstract updateState(valid: boolean, value: string | Array<string>): IValidationSate;

    abstract getValueFromEvent(evt: Event): string | Array<string>;
}