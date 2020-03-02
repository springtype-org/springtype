import {attr, component} from "../../component";
import {st} from "../../../core/st";
import {ValidationComponent} from "./validation-component";
import {IAttrFormComponent} from "../interface/i-attr-form-component";
import {IFormState} from "../interface/i-form-state";
import {BaseComponent} from "./base-component";

@component({tag: 'form'})
export class Form extends BaseComponent<IAttrFormComponent> {

    @attr
    name: string = "form";

    @attr
    action!: string;

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
            for (const subForm of this.getSubForms()) {
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

    getElements(): ValidationComponent<any>[] {
        const validationComponents: ValidationComponent<any>[] = [];
        const htmlForm = this.el as HTMLFormElement;
        for (const element of htmlForm.elements) {
            if ((element as any).$stComponent && (element as any).$stComponent instanceof ValidationComponent) {
                const validationComponent = (element as any).$stComponent as ValidationComponent<any>;
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
        for (const element of elements) {
            if (element instanceof HTMLButtonElement) {
                continue;
            }
            if (element instanceof HTMLInputElement) {
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
        const subFoms = this.getSubForms();
        for (const form of subFoms) {
            formState[form.name] = form.getState();
        }
        return formState;
    }

    getSubForms(): Array<Form> {
        const forms: Array<Form> = [];
        this.el.querySelectorAll('form').forEach((el) => {
            if (el.$stComponent && el.$stComponent instanceof Form) {
                const nestedForm = el.$stComponent as Form;
                if (nestedForm.parent === this) {
                    forms.push(el.$stComponent as Form);
                }
            } else {
                st.error('Using a nested form that is not a springtype form', el);
            }
        });
        return forms;
    }


}