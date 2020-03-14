import {attr, component} from "../../component";
import {st} from "../../../core/st";
import {ValidationComponent} from "./validation-component";
import {IAttrFormComponent} from "../interface/i-attr-form-component";
import {IFormState} from "../interface/i-form-state";
import {BaseComponent} from "./base-component";
import {htmlCollectionToArray} from "../../../core/lang";

@component({tag: 'form'})
export class Form extends BaseComponent<IAttrFormComponent> {

    @attr
    name: string = "form";

    @attr
    action!: string;

    //onSubmit:()

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
            for (const element of this.elements) {
                elementResults.push(element.validate().then(v => !(v.valid === false || v.valid === 'none')));
            }
            const formResults: Array<Promise<boolean>> = [];
            for (const subForm of this.subForm) {
                formResults.push(subForm.validate())
            }
            if ((await Promise.all(elementResults)).filter(v => !v).length > 0) {
                (this.el as HTMLFormElement).checkValidity();
                result = false;
            }
            if ((await Promise.all(formResults)).filter(v => !v).length > 0) {
                result = false;
            }
            resolve(result);
        });
    }

    get elements(): ValidationComponent<any>[] {
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

    get state() {
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
        for (const form of this.subForm) {
            formState[form.name] = form.state;
        }
        return formState;
    }

    get subForm(): Array<Form> {
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
}