import {MwcTextfield} from "./mwc-textfield";
import {ActiveRenderer, VirtualElement} from '@springtype/core';
import classNames from "classnames";
import {MWC_TEXTFIELD_VARIANT_TYPE} from "./mwc-textfield-variant-type";
import outline from './mwc-textfield.tpl-outlined'
import filled from './mwc-textfield.tpl-filled'

export default (component: MwcTextfield) => {

    const ariaLabel = component.label || component.icon;

    const classes = classNames({
        'mdc-text-field': true,
        'mdc-text-field--disabled': component.disabled,
        'mdc-text-field--outlined': component.variant == MWC_TEXTFIELD_VARIANT_TYPE.OUTLINED,
        'mdc-ripple-upgraded': component.variant === MWC_TEXTFIELD_VARIANT_TYPE.FILLED,
        'mwc-text-field-filled-shaped': component.variant === MWC_TEXTFIELD_VARIANT_TYPE.FILLED && component.shaped,
        'mdc-text-field--with-leading-icon': component.icon && !component['trailing-icon'],
        'mdc-text-field--with-trailing-icon': component.icon && component['trailing-icon'],
    });

    // @ts-ignore
    const inputElement: VirtualElement = <input class="mdc-text-field__input" value={component.value}/>;
    if (component.disabled) {
        inputElement.attributes.disabled = true;
    }
    return <div class={classes} aria-label={ariaLabel}>
        {component.variant == MWC_TEXTFIELD_VARIANT_TYPE.OUTLINED ? outline(component) : filled(component)}
        {inputElement}
        {mdcIcon(component['icon'])}
    </div>

}

const mdcIcon = (str: string) => !str ? '' : <i class="material-icons mdc-text-field__icon">{str}</i>;
