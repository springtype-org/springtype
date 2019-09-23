import {tsx} from "../../../../src/web/vdom";
import {MwcSelect} from "./mwc-select";
import {ISelectItem} from "./ISelectItem";

export default (component: MwcSelect) => {
    return <div class="mdc-select mdc-ripple-upgraded">
        <i class="mdc-select__dropdown-icon"></i>
        <select onChange={component.onMwcSelected} id="filled" class="mdc-select__native-control">
            {component["mwc-items"].map((selectItem: ISelectItem) =>
                <option value={selectItem.id}>{selectItem.displayValue}</option>
            )}
        </select>
        <label for="filled" class="mdc-floating-label mdc-floating-label--float-above">{component["mwc-label"]}</label>
        <div class="mdc-line-ripple"></div>
    </div>
}
