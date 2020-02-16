import {ILifecycle} from "../../component/interface";
import {attr} from "../../component";
import {st} from "../../../core/st";
import {IAttrBaseComponent} from "../interface/i-attr-base-component";
import {AttrType} from "../../component/trait/attr";
import {ValidationComponent} from "./validation-component";

export abstract class BaseComponent<Attribute extends IAttrBaseComponent> extends st.component<Attribute> implements ILifecycle {

    @attr(AttrType.DOM_TRANSPARENT)
    name!: string;

    @attr
    disabled!: any;

    onAfterElCreate() {
        if (this.name) {
            this.el.setAttribute('name', this.name);
        } else {
            if (this instanceof ValidationComponent) {
                st.error(`${this.constructor.name} needs an name attribute`, this);
            }
        }
        if (this.disabled) {
            this.el.setAttribute('disabled', '');
        }
    }

    onAttributeChange(name: string, newValue: string) {
        if (this.INTERNAL.notInitialRender) {
            if (name == 'disabled') {
                if (this.disabled) {
                    this.el.setAttribute('disabled', '');
                } else {
                    this.el.removeAttribute('disabled');
                }
            }
            if (name == 'name') {
                this.el.setAttribute('name', newValue);
            }
        }
    }
}