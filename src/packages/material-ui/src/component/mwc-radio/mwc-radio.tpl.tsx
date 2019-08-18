import {MwcRadio} from "./mwc-radio";
import {ActiveRenderer, VirtualElement} from '../../../../core';
import classNames from "classnames";

export default (component: MwcRadio) => {

    const classes = classNames({
        'mdc-radio': true,
        'mdc-radio--disabled': component.disabled,
    });

    const inputElement: VirtualElement = <input st-inject={{radio: component}} type="radio"
                                                class="mdc-radio__native-control"/>;
    if (component.checked) {
        inputElement.attributes.checked = true;
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
            <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"/>
                <div class="mdc-radio__inner-circle"/>
            </div>
        </div>
        <label for="radio-1">{component.label}</label>
    </div>


}