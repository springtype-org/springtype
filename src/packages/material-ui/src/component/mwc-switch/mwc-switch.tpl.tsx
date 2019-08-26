import {MwcSwitch} from "./mwc-switch";
import {ActiveRenderer} from '@springtype/core';
import classNames from "classnames";

export default (component: MwcSwitch) => {

    const inputElement = <input st-inject={{switchElement: MwcSwitch}} type="checkbox" id="basic-switch"
                                class="mdc-switch__native-control"/>;

    if (component.checked) {
        inputElement.attributes.checked = true;
    }
    if (component.value) {
        inputElement.attributes.value = component.value;
    }
    if (component.name) {
        inputElement.attributes.name = component.name;
    }

    const classes = classNames({
        'mdc-switch': true,
        'mdc-switch--checked': component.checked,
        'mdc-switch--disabled': component.disabled,
    });

    return <st-fragment>
        <div class={classes}>
            <div class="mdc-switch__track"/>
            <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb">
                    {inputElement}
                </div>
            </div>
        </div>
        <label for="basic-switch">{component.label}</label>
    </st-fragment>
}

