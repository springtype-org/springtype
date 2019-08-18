import {MwcTextfield} from "./mwc-textfield";
import {ActiveRenderer} from '../../../../core';
import classNames from "classnames";


export default (component: MwcTextfield) =>  {
    return <st-fragment>
        <div class="mdc-line-ripple"/>
        <label st-inject={{labelEL: component}} class={classNames({
            'mdc-floating-label': true,
        })}>{component.label}</label>
    </st-fragment>
};