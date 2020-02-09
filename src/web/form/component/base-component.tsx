import {st} from "../../../core/st";
import {ILifecycle} from "../../component/interface";
import {attr} from "../../component";
import {getUniqueId} from "../function/get-unique-id";
import {From} from "./from-component";
import {IValidationSate} from "../interface/ivalidation-sate";
import {IFormValidationStateValue} from "../interface/iform-validation-state-value";
import {AttrType} from "../../component/trait/attr";

export abstract class BaseComponent<A> extends st.component<A> implements ILifecycle {

    @attr(AttrType.DOM_TRANSPARENT)
    id: string = getUniqueId();

    @attr(AttrType.DOM_TRANSPARENT)
    name!: string;

    @attr
    disabled: boolean = false;

    parentForm!: From;

    onAfterInitialRender() {
        this.findForm(this.parent);
        if (this.parentForm) {
            const validationStateValue = this.parentForm.state.value as IFormValidationStateValue;
            const state = this.getState();
            if (validationStateValue[this.name] && process.env.NODE_ENV === 'development') {
                st.warn(`Register an input / select with an already registered name ${this.name}`,
                    validationStateValue[this.name],
                    state
                );
            }
            validationStateValue[this.name] = state;
        }
        if (this.disabled) {
            this.el.setAttribute('disabled', 'true');
        }
    }

    findForm(parent: ILifecycle | undefined) {
        if (parent) {
            st.debug('this', this);
            st.debug('parent', parent);
            if (parent instanceof From) {
                this.parentForm = parent as From
            } else {
                //check component parent
                this.findForm(parent.parent);
            }
        }
    }

    abstract getState(): IValidationSate;


}