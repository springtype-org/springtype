import {ActiveRenderer, VirtualElement} from "@springtype/core";
import classNames from "classnames";
import {MWCSelect} from "./MWCSelect";

import '@material/select/dist/mdc.select.min.css';

export default (view: MWCSelect) => {

    const classes = classNames({
        'mdc-select': true,
        'mdc-select--disabled': view.disabled,
    })

    const selectElement: VirtualElement =
        <select inject={{select: view}} class="mdc-select__native-control">
            <st-slot unwrap/>
        </select>;

    if (view.disabled) {
        selectElement.attributes.disabled = true;
    }
    if (view.name) {
        selectElement.attributes.name = view.name;
    }

    return <div class={classes}>
        <i class="mdc-select__dropdown-icon"/>
        {selectElement}
        <label class="mdc-floating-label">{view.label}</label>
        <div class="mdc-line-ripple"/>
    </div>
}