import {attr, component} from "../component";
import {IValidationSate} from "./interface/ivalidation-sate";
import {st} from "../../core/st";
import {BaseInputComponent, IAttrBaseInputComponent} from "./base-input-component";

interface IAttrSelectComponent extends IAttrBaseInputComponent, Partial<HTMLSelectElement> {
}

@component({tag: 'select'})
export class SelectComponent extends BaseInputComponent<IAttrSelectComponent> {

    @attr
    multiple: boolean = false;

    state: IValidationSate = Object.freeze({
        value: [],
        valid: false,
        cmp: this
    });

    constructor() {
        super();
        console.log('select constructor',this);
    }

    render() {
        return this.renderChildren()
    }

    onAfterInitialRender() {
        super.onAfterInitialRender();
        st.debug('select', this.el);
        this.state = Object.freeze({
            ...this.state,
            value: this.getSelectedValues(this.el as HTMLSelectElement),
        });
        if (this.multiple) {
            this.el.setAttribute('multiple', 'true');
        }
    }

    getState(): IValidationSate {
        return this.state;
    }

    getSelectedValues(selectEl: HTMLSelectElement): Array<string> {
        const value = [];
        if (selectEl.selectedOptions) {
            for (const option of selectEl.selectedOptions) {
                value.push(option.value);
            }
        }
        return value;
    }

    getValueFromEvent(evt: Event): Array<string> {
        this.state = Object.freeze({
            ...this.state,
            value: this.getSelectedValues(evt.target as HTMLSelectElement),
        });
        return this.state.value as Array<string>;
    }


    updateState(valid: boolean, value: string): IValidationSate {
        return this.state = Object.freeze({...this.state, valid, value});
    }


}