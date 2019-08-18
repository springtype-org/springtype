import {MwcIconButton} from "./mwc-icon-button";
import {ActiveRenderer} from '../../../../core';
import classNames from "classnames";

export default (component: MwcIconButton) => {

    const buttonClasses = classNames({
        'mdc-icon-button': true,
        'mdc-icon-button--on': component.on
    });

    const ariaLabel = component.label;
    const ariaPressed = component.on ? 'true' : 'false';

    return <button
        st-inject={{iconButton: component}}
        class={buttonClasses}
        onclick={component.toggleOnClick}
        aria-hidden={"true"} // TODO: Maybe dynamic
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}>
        <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">{component["name-on"]}</i>
        <i class="material-icons mdc-icon-button__icon">{component["name-off"]}</i>

    </button>
}

