import {ActiveRenderer} from "@springtype/core";
import {MWCIconButton} from "./MWCIconButton";
import classNames from "classnames";
import "@material/icon-button/dist/mdc.icon-button.min.css"

export default (view: MWCIconButton) => {

    const buttonClasses = classNames({
        'mdc-icon-button': true,
        'mdc-icon-button--on': view.on
    });

    const ariaLabel = view.label;
    const ariaPressed = view.on ? 'true' : 'false';

    return <button
        inject={{iconButton: view}}
        class={buttonClasses}
        onclick={view.toggleOnClick}
        aria-hidden={"true"} // TODO: Maybe dynamic
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}>
        <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">{view["name-on"]}</i>
        <i class="material-icons mdc-icon-button__icon">{view["name-off"]}</i>

    </button>;
}

