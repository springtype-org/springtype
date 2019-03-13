import {MWCButton} from "./MWCButton";

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

    console.error(view["trailing-icon"]);
    return <button class={`mdc-button ${classes}`}
                   aria-label={view.label || view.icon}>
        {view.icon && !view["trailing-icon"] ? mdcButtonIcon : ''}
        <span class="mdc-button__label">{view.label}</span>
        {view.icon && view["trailing-icon"] ? mdcButtonIcon : ''}
        <slot></slot>
    </button>


}