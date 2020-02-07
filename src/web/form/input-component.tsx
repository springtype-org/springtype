import {attr, component} from "../component";
import {IValidationSate} from "./interface/ivalidation-sate";
import {tsx} from "../vdom";
import {BaseInputComponent, IAttrBaseInputComponent} from "./base-input-component";
import {AttrType} from "../component/trait/attr";

export interface IAttrInputComponent extends IAttrBaseInputComponent, Partial<HTMLInputElement> {
}

@component({tag: 'input'})
export class InputComponent extends BaseInputComponent<IAttrInputComponent> {

    @attr(AttrType.DOM_TRANSPARENT)
    value: string = '';

    @attr(AttrType.DOM_TRANSPARENT)
    type: string = 'text';

    @attr
    checked: boolean = false;

    state: IValidationSate = Object.freeze({
        value: this.value,
        valid: false,
        cmp: this
    });

    onAfterInitialRender() {
        super.onAfterInitialRender();
        if(this.checked){
            this.setAttribute('checked',true);
        }
    }

    render() {
        return <fragment/>;
    }

    getState(): IValidationSate {
        return this.state;
    }

    getValueFromEvent(evt: Event): string {
        const inputTarget = evt.target as HTMLInputElement;
        return inputTarget.value;
    }

    updateState(valid: boolean, value: string): IValidationSate {
        return this.state = Object.freeze({...this.state, valid, value});
    }
}