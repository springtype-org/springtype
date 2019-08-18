import {MwcCheckbox} from "./mwc-checkbox";
import {ActiveRenderer, VirtualElement} from '../../../../core';
import classNames from "classnames";
import {uniqueId} from "../../uniqueId";
import {MWC_CHECKBOX_CHECKED_TYPE} from "./mwc-ceckbox-checked-type";

export default (component: MwcCheckbox) => {

    const classes = classNames({
        'mdc-checkbox': true,
        'mdc-checkbox--disabled': component.disabled,
    });

    const uniqueCheckboxId = uniqueId() + '_' + Date.now() + '_checkbox';
    const inputElement: VirtualElement = <input st-inject={{checkbox: component}} id={uniqueCheckboxId} type="checkbox"
                                                class="mdc-checkbox__native-control" aria-checked="mixed"/>;
    if (component.checked === true) {
        inputElement.attributes.checked = true;
    }
    console.log(component.checked)
    if (component.checked === 'indeterminate') {
        inputElement.attributes.indeterminate = true
    }
    if (component.disabled) {
        inputElement.attributes.disabled = true;
    }
    if (component.value) {
        inputElement.attributes.value = component.value;
    }
    if (component.name) {
        inputElement.attributes.name = component.name;
    }

    return <div class="mdc-form-field">
        <div class={classes}>
            {inputElement}
            <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path class="mdc-checkbox__checkmark-path" fill="none" stroke="white"
                          d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                </svg>
                <div class="mdc-checkbox__mixedmark"/>
            </div>
        </div>
        <label for={uniqueCheckboxId}>{component.label}</label>
    </div>
}