import {tsx} from "../../../../src/web/vdom";
import {MwcSelect} from "./mwc-select";
import {ISelectItem} from "./ISelectItem";

export default (component: MwcSelect) => {
    const options = component["mwc-items"].map((selectItem: ISelectItem) =>
        <option value={selectItem.value}>{selectItem.displayValue}</option>
    );

    console.log('options',options);

    const result = <div class="mdc-select mdc-ripple-upgraded">
        <i class="mdc-select__dropdown-icon"></i>
        <select id="filled" class="mdc-select__native-control">
            {options}
            <option value={1223}>asd</option>
        </select>
        <label for="filled" class="mdc-floating-label mdc-floating-label--float-above">{component["mwc-label"]}</label>
        <div class="mdc-line-ripple"></div>
    </div>

    console.log("select tpl result",result);
    return result;
}
