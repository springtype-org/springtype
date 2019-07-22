import {MWCTextfield} from "./MWCTextfield";
import classNames from "classnames";
import {ActiveRenderer, VirtualElement} from "@springtype/core";
//css
import "@material/textfield/dist/mdc.textfield.min.css"

const mdcIcon = (str: string) => !str ? '' : <i class="material-icons mdc-text-field__icon">{str}</i>;

const outlineLabel = (view: MWCTextfield) => {
    return <div class={classNames({
        'mdc-notched-outline': true,
        'mdc-notched-outline--upgraded': true,
        'mdc-notched-outline--notched': view.isFocused || view.value
    })}>
        <div class="mdc-notched-outline__leading"/>
        <div class={classNames({
            'mdc-notched-outline__notch': true,
            'mdc-help--float-above': view.isFocused || view.value,
            'mdc-help--float-above-width': view.isFocused || view.value
        })}>
            <label inject={{labelEL: view}} class={classNames({
                'mdc-floating-label': true,
                'mdc-floating-label--float-above': view.isFocused || view.value
            })}>{view.label}</label>
        </div>
        <div class="mdc-notched-outline__trailing"/>
    </div>
};

const filledLabel = (view: MWCTextfield) => {
    return <st-fragment>
        <div class="mdc-line-ripple"/>
        <label inject={{labelEL: view}} class={classNames({
            'mdc-floating-label': true,
            'mdc-floating-label--float-above': view.isFocused || view.value
        })}>{view.label}</label>
    </st-fragment>
};

export default (view: MWCTextfield) => {

    const ariaLabel = view.label || view.icon;

    const classes = classNames({
        'mdc-text-field': true,
        'mdc-text-field--disabled': view.disabled,
        'mdc-text-field--outlined': view.variant === 'outlined',
        'mdc-ripple-upgraded': view.variant === 'filled',
        'mdc-text-field--with-leading-icon': view.icon && !view['trailing-icon'],
        'mdc-text-field--with-trailing-icon': view.icon && view['trailing-icon'],
        'mdc-text-field--focused': view.isFocused
    });

    // @ts-ignore
    const inputElement: VirtualElement = <input inject={{inputEL: view}}
                                                onfocusin={view.onInputFocusin}
                                                onfocusout={view.onInputFocusOut}
                                                onchange={view.onInputChange}
                                                class="mdc-text-field__input" value={view.value}/>;
    if (view.disabled) {
        inputElement.attributes.disabled = true;
    }

    const helper = view["helper-text"] ? <div class={classNames({
        'mdc-text-field-helper-line': true,
        'no-display': !view['helper-text']
    })}>
        <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">{view['helper-text']}</div>
    </div> : '';
    return <st-fragment>
        <div class={classes} aria-label={ariaLabel}>
            {view.variant === 'outlined' ? outlineLabel(view) : filledLabel(view)}
            {inputElement}
            {mdcIcon(view['icon'])}
        </div>
        {helper}

    </st-fragment>;
}

