import {tsx} from "../../../../src/web/vdom";
import {MwcSelect} from "./mwc-select";
import {ISelectItem} from "./ISelectItem";

export default (component: MwcSelect) => {
    let selected = false;
    const seletItmes = component["mwc-items"].map((selectItem: ISelectItem) => {
            const _selected: boolean = (component.selected || false) && component.selected.value == selectItem.value;
            if (_selected) {
                selected = true;
                console.log(<option selected value={selectItem.value}>{selectItem.displayValue}</option>)
                return <option selected value={selectItem.value}>{selectItem.displayValue}</option>
            } else {
                return <option value={selectItem.value}>{selectItem.displayValue}</option>
            }
        }
    );
    const firstOption = selected
        ? <option disabled>Select Value</option>
        : <option selected disabled>Select Value</option>;
    console.log(selected,firstOption);

    return <div class="mdc-select mdc-ripple-upgraded">
        <i class="mdc-select__dropdown-icon"></i>
        <select onChange={component.onChange} id="filled" class="mdc-select__native-control">
            {firstOption}
            {seletItmes}
        </select>
        <label for="filled" class="mdc-floating-label mdc-floating-label--float-above">{component["mwc-label"]}</label>
        <div class="mdc-line-ripple"></div>
    </div>
}
