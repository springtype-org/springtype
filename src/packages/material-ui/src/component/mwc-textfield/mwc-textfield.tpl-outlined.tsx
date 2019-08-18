import {MwcTextfield} from "./mwc-textfield";
import {ActiveRenderer} from '../../../../core';
import classNames from "classnames";


export default (component: MwcTextfield) => {
    return <div class={classNames({
        'mdc-notched-outline': true,
        'mdc-notched-outline--upgraded': true,
    })}>
        <div class={classNames({
            'mwc-text-field-outlined-leading-shaped': component.shaped,
            'mdc-notched-outline__leading': true
        })}/>
        <div class={classNames({
            'mdc-notched-outline__notch': true,
        })}>
            <label st-inject={{labelEL: component}} class={classNames({
                'mdc-floating-label': true,
            })}>{component.label}</label>
        </div>
        <div class={classNames({
            'mwc-text-field-outlined-trailing-shaped': component.shaped,
            'mdc-notched-outline__trailing': true
        })}/>
    </div>
};