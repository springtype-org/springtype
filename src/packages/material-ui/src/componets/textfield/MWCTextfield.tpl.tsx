import {MWCTextfield, MWCTEXTFIELD_VARIANT_TYPE} from "./MWCTextfield";
import classNames from "classnames";
import {ActiveRenderer, VirtualElement} from "@springtype/core";
//css
import "@material/textfield/dist/mdc.textfield.min.css"

const mdcIcon = (str: string) => !str ? '' : <i class="material-icons mdc-text-field__icon">{str}</i>;

const outlineLabel = (view: MWCTextfield) => {
    return <div class={classNames({
        'mdc-notched-outline': true,
        'mdc-notched-outline--upgraded': true,
    })}>
        <div class={classNames({
            'mwc-text-field-outlined-leading-shaped': view.shaped,
            'mdc-notched-outline__leading': true
        })}/>
        <div class={classNames({
            'mdc-notched-outline__notch': true,
        })}>
            <label st-inject={{labelEL: view}} class={classNames({
                'mdc-floating-label': true,
            })}>{view.label}</label>
        </div>
        <div class={classNames({
            'mwc-text-field-outlined-trailing-shaped': view.shaped,
            'mdc-notched-outline__trailing': true
        })}/>
    </div>
};

const filledLabel = (view: MWCTextfield) => {
    return <st-fragment>
        <div class="mdc-line-ripple"/>
        <label st-inject={{labelEL: view}} class={classNames({
            'mdc-floating-label': true,
        })}>{view.label}</label>
    </st-fragment>
};

export default (view: MWCTextfield) => {

    const ariaLabel = view.label || view.icon;

    const classes = classNames({
        'mdc-text-field': true,
        'mdc-text-field--disabled': view.disabled,
        'mdc-text-field--outlined': view.variant == MWCTEXTFIELD_VARIANT_TYPE.OUTLINED,
        'mdc-ripple-upgraded': view.variant === MWCTEXTFIELD_VARIANT_TYPE.FILLED,
        'mwc-text-field-filled-shaped': view.variant === MWCTEXTFIELD_VARIANT_TYPE.FILLED && view.shaped,
        'mdc-text-field--with-leading-icon': view.icon && !view['trailing-icon'],
        'mdc-text-field--with-trailing-icon': view.icon && view['trailing-icon'],
    });

    // @ts-ignore
    const inputElement: VirtualElement = <input class="mdc-text-field__input" value={view.value}/>;
    if (view.disabled) {
        inputElement.attributes.disabled = true;
    }
    return <st-fragment>
        <div class={classes} aria-label={ariaLabel}>
            {view.variant == MWCTEXTFIELD_VARIANT_TYPE.OUTLINED ? outlineLabel(view) : filledLabel(view)}
            {inputElement}
            {mdcIcon(view['icon'])}
        </div>
    </st-fragment>
}

