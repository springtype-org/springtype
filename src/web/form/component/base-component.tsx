import {ILifecycle} from "../../component/interface";
import {attr} from "../../component";
import {st} from "../../../core/st";
import {IAttrBaseComponent} from "../interface/i-attr-base-component";
import {Form} from "./form-component";


export abstract class BaseComponent<Attribute extends IAttrBaseComponent> extends st.component<Attribute> implements ILifecycle {

    @attr
    disabled!: any;

    @attr
    activeLabelClasses!: Array<string>;

    @attr
    invalidClasses!: Array<string>;

    @attr
    validClasses!: Array<string>;

    shouldAttributeChange(name: string, newValue: any, oldValue: any): boolean {
        if (this.INTERNAL.notInitialRender) {
            if (name === 'disabled') {
                if (newValue) {
                    this.el.setAttribute('disabled', '');
                } else {
                    this.el.removeAttribute('disabled');
                }
                return false
            }
        }
        return true;
    }


    getParentForm(): Form | undefined {
        let parent: ILifecycle | undefined = this.parent;
        while (parent && !(parent instanceof Form)) {
            parent = parent.parent;
        }
        return parent;
    }

    getValidClasses(): Array<string> {
        if (this.validClasses) {
            return this.validClasses;
        }
        //take from parent from
        const parentForm = this.getParentForm();
        if (parentForm) {
            return parentForm.getValidClasses();
        }
        return st.form.validClasses;
    }

    getInvalidClasses(): Array<string> {
        if (this.invalidClasses) {
            return this.invalidClasses;
        }
        //take from parent from
        const parentForm = this.getParentForm();
        if (parentForm) {
            return parentForm.getInvalidClasses();
        }
        return st.form.invalidClasses;
    }

    getActiveLabelClasses(): Array<string> {
        if (this.activeLabelClasses) {
            return this.activeLabelClasses;
        }
        //take from parent from
        const parentForm = this.getParentForm();
        if (parentForm) {
            return parentForm.getActiveLabelClasses();
        }
        return st.form.labelActiveClasses;
    }
}