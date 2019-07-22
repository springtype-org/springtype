import {MWCSwitch} from "./MWCSwitch";
import {ActiveRenderer, VirtualElement} from "@springtype/core";
import classNames from "classnames";
import "@material/switch/dist/mdc.switch.min.css"
import '@material/form-field/dist/mdc.form-field.min.css';

export default (view: MWCSwitch) => {

    const classes = classNames({
        'mdc-switch': true,
        'mdc-switch--disabled': view.disabled,
        'mdc-switch--checked': view.checked,
    });

    const inputElement: VirtualElement = <input onchange={view.onSwitchChange} inject={{_switch: view}} type="checkbox"
                                                id="switch" class="mdc-switch__native-control"/>;
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
            <div inject={{ripple: view}} class="mdc-switch__track"/>
            <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb">
                    {inputElement}
                </div>
            </div>
        </div>
        <label for="switch">{view.label}</label>
    </div>
}