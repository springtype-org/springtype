import {BaseComponent} from "./base-component";
import {IFormValidationSate, IValidationSate} from "./interface/ivalidation-sate";
import {component} from "../component";

export interface IAttrFromComponent extends Partial<HTMLFormElement> {
}

@component({tag: 'form'})
export class FromComponent extends BaseComponent<IAttrFromComponent> {

    state: IFormValidationSate = Object.freeze({
        valid: false,
        value: {},
        cmp: this
    });

    render() {
        return this.renderChildren();
    }

    getState(): IValidationSate {
        return this.state;
    }

    get(name: string) {
        return this.state.value[name];
    }
}