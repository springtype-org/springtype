import {MWCButton, MWCBUTTON_VARIANT_TYPE} from "./MWCButton";
import classNames from "classnames";
import {ActiveRenderer, VirtualElement} from "@springtype/core";
import "@material/button/dist/mdc.button.min.css"

export default (view: MWCButton) => {
    const classes = classNames({
        'mdc-button': true,
        'mdc-button--raised': view.variant == MWCBUTTON_VARIANT_TYPE.RAISED,
        'mdc-button--unelevated': view.variant == MWCBUTTON_VARIANT_TYPE.UNELEVATED,
        'mdc-button--outlined': view.variant == MWCBUTTON_VARIANT_TYPE.OUTLINED,
        'mdc-button--dense': view.dense,
        'mwc-button-shaped': view.shaped
    });

    const ariaLabel = view.label || view.icon;
    const mdcButtonIcon = <span class="material-icons mdc-button__icon">{view.icon}</span>;

    const innerButtonElement =
        <st-fragment>
            {view.icon && !view["trailing-icon"] ? mdcButtonIcon : ''}
            <span class="mdc-button__label">
            {
                view.label
            }
            </span>
            {view.icon && view["trailing-icon"] ? mdcButtonIcon : ''}
            <st-slot/>
        </st-fragment>;

    const button: VirtualElement = <button onclick={view.onclick} class={classes} aria-label={ariaLabel}>{innerButtonElement}</button>;


    if (view.disabled) {
        button.attributes.disabled = true;
    }
    return button;
}
