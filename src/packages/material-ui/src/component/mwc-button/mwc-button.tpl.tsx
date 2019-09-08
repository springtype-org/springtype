import {MwcButton} from "./mwc-button";
import {ActiveRenderer, VirtualElement} from '@springtype/core';
import classNames from "classnames";
import {MWC_BUTTON_VARIANT_TYPE} from "./mwc-button-variant-type";

export default (component: MwcButton) => {

    const classes = classNames({
        'mdc-button': true,
        'mdc-button--raised': component.variant == MWC_BUTTON_VARIANT_TYPE.RAISED,
        'mdc-button--unelevated': component.variant == MWC_BUTTON_VARIANT_TYPE.UNELEVATED,
        'mdc-button--outlined': component.variant == MWC_BUTTON_VARIANT_TYPE.OUTLINED,
        'mdc-button--dense': component.dense,
        'mwc-button-shaped': component.shaped
    });

    const ariaLabel = component.label || component.icon;
    const mdcButtonIcon = <span class="material-icons mdc-button__icon">{component.icon}</span>;

    const innerButtonElement =
        <st-fragment>
            {component.icon && !component["trailing-icon"] ? mdcButtonIcon : ''}
            <span class="mdc-button__label">
            {
                component.label
            }
            </span>
            {component.icon && component["trailing-icon"] ? mdcButtonIcon : ''}
            <st-slot/>
        </st-fragment>;

    const button: VirtualElement = <button st-inject={{button: component}} onclick={component._onclick} class={classes}
                                           aria-label={ariaLabel}>{innerButtonElement}</button>;


    if (component.disabled) {
        button.attributes.disabled = true;
    }
    return button;

}
