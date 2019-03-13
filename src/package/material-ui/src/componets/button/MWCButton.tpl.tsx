import {MWCButton} from "./MWCButton";
import './MWCButton.scss'

export default (view: MWCButton) => {

    const classes: string = [
        {name: 'mdc-button--raised', present: view.raised},
        {name: 'mdc-button--unelevated', present: view.unelevated},
        {name: 'mdc-button--outlined', present: view.outlined},
        {name: 'mdc-button--dense', present: view.dense}
    ].filter(c => c.present)
        .map(c => c.name)
        .join(' ');

    const mdcButtonIcon = <span class="material-icons mdc-button__icon">{view.icon}</span>;

    console.error(view.icon);
    return <button class={`mdc-button ${classes}`}
                   aria-label={view.label || view.icon}>
        {view.icon && !view.trailingIcon ? mdcButtonIcon : ''}
        <span class="mdc-button__label">{view.label}</span>
        {view.icon && view.trailingIcon ? mdcButtonIcon : ''}
        <slot></slot>
    </button>


}