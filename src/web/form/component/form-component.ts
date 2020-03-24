import {attr, component, event} from "../../component";
import {st} from "../../../core/st";
import {ValidationComponent} from "./validation-component";
import {IAttrFormComponent} from "../interface/i-attr-form-component";
import {IFormState} from "../interface/i-form-state";
import {BaseComponent} from "./base-component";
import {htmlCollectionToArray} from "../../../core/lang";
import {IEvent, IEventListener} from "../../component/interface";

export interface StFromValidationEvent extends IEvent<StFromValidationDetail> {
}

export interface StFromValidationDetail {
    valid: boolean;
    state: {};
}


@component({tag: 'form'})
export class Form extends BaseComponent<IAttrFormComponent> {

    @attr
    name: string = "form";

    @attr
    action!: string;

    @event
    onStFormValidation!: IEventListener<Event>;

    dispatchStFormValidation = (detail: StFromValidationDetail) => {
        this.dispatchEvent<StFromValidationDetail>("stFormValidation", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                ...detail,
            },
        });
    };

    render() {
        return this.renderChildren();
    }

    onAfterElCreate() {
        this.overrideSubmit();
    }

    overrideSubmit() {
        const form = this.el as HTMLFormElement;

        //ignore on submit validate forms async
        form.onsubmit = () => false;

        this.el.addEventListener('submit', async () => {
            if (await this.validate()) {
                form.submit();
            }
        })
    }

    async validate(): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            let result = true;
            const elementResults: Array<Promise<boolean>> = [];
            for (const element of this.getElements()) {
                elementResults.push(element.validate().then(v => !(v.valid === false || v.valid === 'none')));
            }
            const formResults: Array<Promise<boolean>> = [];
            for (const subForm of this.getSubForm()) {
                formResults.push(subForm.validate())
            }
            if ((await Promise.all(elementResults)).filter(v => !v).length > 0) {
                (this.el as HTMLFormElement).checkValidity();
                result = false;
            }
            if ((await Promise.all(formResults)).filter(v => !v).length > 0) {
                result = false;
            }

            this.dispatchStFormValidation({
                    valid: result,
                    state: this.getState()
                }
            );
            resolve(result);
        });
    }

    getElements(): ValidationComponent<any>[] {
        const validationComponents: Array<ValidationComponent<any>> = [];
        for (const element of htmlCollectionToArray<any>((this.el as HTMLFormElement).elements)) {
            if (element.$stComponent && element.$stComponent instanceof ValidationComponent) {
                const validationComponent = element.$stComponent as ValidationComponent<any>;
                if (!validationComponent.disabled) {
                    validationComponents.push(validationComponent);
                }
            }
        }
        return validationComponents;
    }

    getState() {
        const formState: IFormState = {};
        const htmlForm = this.el as HTMLFormElement;
        const radios: { [name: string]: RadioNodeList } = {};
        const elements = htmlForm.elements;
        for (const element of htmlCollectionToArray<HTMLElement>(elements)) {


            if (element instanceof HTMLButtonElement) {
                continue;
            }
            if (element instanceof HTMLInputElement) {
                if (element.disabled) {
                    continue;
                }
                const htmlInput = element as HTMLInputElement;
                if (htmlInput.type === 'radio' && htmlInput.name) {
                    radios[htmlInput.name] = elements.namedItem(htmlInput.name) as RadioNodeList;
                    continue;
                }
                if (htmlInput.type === 'checkbox' && htmlInput.name) {
                    formState[htmlInput.name] = htmlInput.checked;
                    continue;
                }
            }
            const htmlElement = (element as any);
            const elementName = htmlElement.name;
            formState[elementName] = htmlElement.value;
        }
        for (const radioGroupName of Object.keys(radios)) {
            formState[radioGroupName] = radios[radioGroupName].value;
        }
        for (const form of this.getSubForm()) {
            formState[form.name] = form.getState();
        }
        return formState;
    }

    getSubForm(): Array<Form> {
        const forms: Array<Form> = [];
        for (const form of htmlCollectionToArray<any>(this.el.querySelectorAll('form'))) {
            if (form.$stComponent && form.$stComponent instanceof Form) {
                const nestedForm = form.$stComponent as Form;
                if (nestedForm.parent === this) {
                    forms.push(nestedForm);
                }
            } else {
                st.error('Using a nested form that is not a springtype form', form);
            }
        }
        return forms;
    }

    reset() {
        (this.el as HTMLFormElement).reset();
    }
}