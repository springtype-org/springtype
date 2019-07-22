import {MWCCheckbox} from "./MWCCheckbox";
import {ActiveRenderer, VirtualElement} from "@springtype/core";
import classNames from "classnames";
import "@material/checkbox/dist/mdc.checkbox.min.css"
import "@material/form-field/dist/mdc.form-field.min.css"
import {uniqueId} from "../../uniqueId";

export default (view: MWCCheckbox) => {

    const classes = classNames({
        'mdc-checkbox': true,
        'mdc-checkbox--disabled': view.disabled,
    });

    const uniqueCheckboxId = uniqueId() + '_' + Date.now() + '_checkbox';
    const inputElement: VirtualElement = <input inject={{checkbox: view}} id={uniqueCheckboxId} type="checkbox"
                                                class="mdc-checkbox__native-control"/>;
    if (view.checked) {
        inputElement.attributes.checked = true;
    }
    if (view.disabled) {
        inputElement.attributes.disabled = true;
    }
    if (view.value) {
        inputElement.attributes.value = view.value;
    }
    if (view.name) {
        inputElement.attributes.name = view.name;
    }

    return <div class="mdc-form-field">
        <div class={classes}>
            {inputElement}
            <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path class="mdc-checkbox__checkmark-path"
                          fill="none"
                          d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
            </div>
        </div>
        <label for={uniqueCheckboxId}>{view.label}</label>
    </div>
}